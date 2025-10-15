export const dynamic = "force-dynamic";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // ✅ Ignore build errors on Vercel
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
