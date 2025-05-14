import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এইভাবে সব হোস্ট সাপোর্ট করবে (⚠️ কিন্তু সিকিউরিটি ও পারফরম্যান্স ইস্যু হতে পারে)
      },
    ],
  },
};

export default nextConfig;
