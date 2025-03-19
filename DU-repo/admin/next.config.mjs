/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  basePath: '/admin',
  eslint: {
    ignoreDuringBuilds: true // going to manually run the lint step in `npm run build` because I can't find a way to set the --rulesdir in the "auto-run" of `next lint` on `next build`
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
