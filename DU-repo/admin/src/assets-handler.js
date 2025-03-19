const { Agent } = require('https');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler');

const { ASSETS_BUCKET_NAME, EXPORTS_BUCKET_NAME, S3_REGION, S3_ENDPOINT } =
  process.env;

const s3Client = new S3Client({
  // These 3 values are needed for localstack S3 to work.
  region: S3_REGION ? S3_REGION : 'us-gov-west-1',
  endpoint: S3_ENDPOINT ? S3_ENDPOINT : undefined,
  forcePathStyle: S3_ENDPOINT ? true : undefined,
  requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent({
      maxSockets: 2000,

      // keepAlive is a default from AWS SDK. We want to preserve this for
      // performance reasons.
      keepAlive: true,
      keepAliveMsecs: 1000
    }),
    requestTimeout: 60_000
  })
});

const removeQuotes = string => string.replace(/"/g, '');

const assetsHandler = (request, response, pathname, type) => {
  const ifModifiedSince = request.headers['if-modified-since'];
  const ifNoneMatch = request.headers['if-none-match'];

  // Applicable to both downloads and templates
  const fileId = pathname.slice(pathname.lastIndexOf('/') + 1);

  // Applicable to non-template assets only
  let key = pathname.slice(8);

  // uridecode key
  key = decodeURIComponent(key);

  // Applicable to both templates and assets
  let bucketName = ASSETS_BUCKET_NAME;

  switch (type) {
    case 'download':
      // Both key and bucketName change for downloads
      key = `${fileId}.csv`;
      bucketName = EXPORTS_BUCKET_NAME;
      break;
    case 'template':
      // Key changes for templates, but bucketName does not
      key = `templates/${fileId}.csv`;
      break;
    default:
      // Initial values above for key and bucketName are correct for this case, no change needed
      break;
  }

  console.log(
    `Received request for ${pathname} from admin portal assets handler`
  );

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  s3Client
    .send(command)
    .then(({ ContentType, ContentLength, Body, LastModified, ETag }) => {
      if (
        (ifModifiedSince &&
          new Date(ifModifiedSince).toUTCString() >=
            LastModified?.toUTCString()) ||
        (ifNoneMatch && removeQuotes(ifNoneMatch) === removeQuotes(ETag))
      ) {
        console.log(
          `Sending 304 Not Modified for ${pathname} from admin portal assets handler`
        );
        response.writeHead(304, {
          // Added to address issue in Checkmarx scan.
          'Strict-Transport-Security':
            'max-age=31536000; includeSubDomains; preload'
        });
        response.end();
      } else {
        console.log(
          `Writing response for ${pathname} from admin portal assets handler`
        );
        response.writeHead(200, {
          'Content-Type': ContentType,
          'Content-Length': ContentLength,
          'Last-Modified': LastModified.toUTCString(),
          ETag
        });
        Body.pipe(response);
      }
    })
    .catch(error => {
      console.error(
        `An error has occurred attempting to fetch the resource "${key}" from S3 bucket "${bucketName}".`,
        error.toString()
      );

      if (error.Code === 'NoSuchKey') {
        console.error(
          `Sending 404 Not Found for ${pathname} from admin portal assets handler`
        );
        response.writeHead(404);
      } else if (error.Code === 'AccessDenied') {
        console.error(
          `Sending 403 Forbidden for ${pathname} from admin portal assets handler`
        );
        response.writeHead(403);
      } else {
        console.error(
          `Sending 500 Internal Server Error for ${pathname} from admin portal assets handler`
        );
        response.writeHead(500);
      }

      response.end();
    });
};

module.exports = assetsHandler;
