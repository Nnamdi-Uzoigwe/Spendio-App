// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// import type { NextConfig } from "next";
// import withPWA from "next-pwa";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   turbopack: {}, // enables Turbopack
// };

// export default withPWA({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// })(nextConfig);

import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {}, // enables Turbopack
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Optional: disable in dev for easier testing
  
  // THIS IS THE KEY PART - Runtime Caching for API calls
  runtimeCaching: [
    // Cache API GET requests (for reading data)
    {
      urlPattern: /^https?:\/\/.*\/api\/.*/i, // matches any /api/* routes
      handler: "NetworkFirst", // Try network first, fall back to cache
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10, // Wait 10s before using cache
      },
    },
    
    // Cache images
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    
    // Cache static assets (JS, CSS, fonts)
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|otf)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
})(nextConfig);