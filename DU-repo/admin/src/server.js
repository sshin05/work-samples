const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const assetsHandler = require('./assets-handler');

/**
 * Custom NextJS server file. We are using this approach because we
 * need to handle requests for assets (/assets) and downloads (/downloads)
 * differently than normal NextJS requests.
 */

const PORT = 8080;

const { NODE_ENV, NEXTAUTH_URL } = process.env;

const app = next({
  dev: NODE_ENV !== 'production',
  hostname: new URL(NEXTAUTH_URL).hostname,
  port: PORT
});

const defaultHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((request, response) => {
    const parsedUrl = parse(request.url, true);
    const { pathname } = parsedUrl;
    if (pathname.startsWith('/health-check')) {
      response.writeHead(200);
      response.write('SUCCESS');
      response.end();
    } else if (pathname.startsWith('/assets/')) {
      assetsHandler(request, response, pathname, 'asset');
    } else if (pathname.includes('/downloads/')) {
      assetsHandler(request, response, pathname, 'download');
    } else if (pathname.includes('/upload-template')) {
      assetsHandler(request, response, pathname, 'template');
    } else {
      defaultHandler(request, response, parsedUrl);
    }
  });

  /**
   * server.keepAliveTimeout = 60 * 3000; // 3 min; was 2 min previously.
   * This duration accounts for < 3G network conditions and a potential issue:
   * The first attempt to access the application after deployment seemed to hit a timeout w/ 3g network throttling.
   * This is a "just in case" measure.
   */
  server.keepAliveTimeout = 60 * 3000;

  server.listen(PORT, error => {
    if (error) throw error;
    console.log(`Server is listening on PORT ${PORT}.`);
  });
});
