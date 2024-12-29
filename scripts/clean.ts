const rimraf = require("rimraf");

const CLEAN_PATHS = [
  // Next.js cache.
  ".next",
  // Export output.
  "dist",
  // Next.js runtime environment variables.
  "next-env.d.ts",
  // next-image-export-optimizer cache.
  "public/images/next-image-export-optimizer-hashes.json",
];

const CLEAN_GLOBS = [
  // next-image-export-optimizer caches.
  "public/**/images-optimized",
];

CLEAN_PATHS.forEach((path_current) => {
  try {
    rimraf.sync(path_current);
  } catch (error) {
    console.log(error);
  }
});

CLEAN_GLOBS.forEach((path_current) => {
  try {
    rimraf.sync(path_current, { glob: true });
  } catch (error) {
    console.log(error);
  }
});
