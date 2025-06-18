import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 許可ホスト
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "example.com",
            },
        ],
    },
};

export default nextConfig;
