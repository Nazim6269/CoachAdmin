// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   poweredByHeader: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "maps.googleapis.com",
//       },
//       {
//         protocol: 'http',
//         hostname: '156.67.221.155',
//         port: '9000',
//         pathname: '/public/photo/**',
//       },
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any HTTPS hostname
      },
      {
        protocol: 'http',
        hostname: '**', // Allow any HTTP hostname
      },
      {
        protocol: 'http',
        hostname: '156.67.221.155',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;