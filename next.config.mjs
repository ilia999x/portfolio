// /** @type {import('next').NextConfig} */
// const path = require('path')
// const nextConfig = {
//   basePath: "/portfolio",
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//     images: {
//       unoptimized: true,
//     },
//     output: 'export',
//     reactStrictMode: true,
//     webpack(config) {
//       config.resolve.fallback = {

//         // if you miss it, all the other options in fallback, specified
//         // by next.js will be dropped.
//         ...config.resolve.fallback,  
  
//         fs: false, // the solution
//       };
      
//       return config;
//     },
//   };

  
//   module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: "/portfolio",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;