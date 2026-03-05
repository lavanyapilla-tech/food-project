const nextConfig = {
  output: "export",   // ADD THIS

  basePath: "/food-project",   // ADD THIS (your repo name)
  assetPrefix: "/food-project/",   // ADD THIS

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;