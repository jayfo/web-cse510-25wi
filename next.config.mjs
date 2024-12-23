import mdx from "@next/mdx";
import rehypeSlug from "rehype-slug";

import { Paths } from "./src/paths.mjs";

// MDX Configuration.
// https://nextjs.org/docs/pages/building-your-application/configuring/mdx
const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // If we later use remark-gfm, we will need to use next.config.mjs.
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webserver base path.
  basePath: Paths.basePath,

  // Ensure build and dev always assume a static export.
  output: "export",

  // Build output to dist directory.
  distDir: "dist",

  // Strict mode for development.
  reactStrictMode: true,

  // Configure pageExtensions to include md and mdx.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Required for next-image-export-optimizer.
  // https://github.com/Niels-IO/next-image-export-optimizer
  transpilePackages: ["next-image-export-optimizer"],

  // Configuration of next-image-export-optimizer.
  // https://github.com/Niels-IO/next-image-export-optimizer
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    // Configuration of next-image-export-optimizer.
    // https://github.com/Niels-IO/next-image-export-optimizer
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "dist",
    nextImageExportOptimizer_exportFolderName: "images-optimized",
    nextImageExportOptimizer_quality: 100,
    nextImageExportOptimizer_storePicturesInWEBP: true,

    // Disabling blurry placeholder images, requires setting this to false
    // and passing placeholder="empty" to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: true,
  },

  experimental: {
    // Disable mdxRs in order to allow plugins as part of MDX configuration.
    mdxRs: false,
  },
};

export default withMDX(nextConfig);
