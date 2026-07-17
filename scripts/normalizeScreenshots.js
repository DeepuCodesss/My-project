const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(process.cwd(), "public", "projects");
const backupDir = path.join(inputDir, "_originals");
const targetWidth = 1920;
const targetHeight = 915;
const background = { r: 10, g: 10, b: 10, alpha: 1 };

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function normalizeFile(fileName) {
  const inputPath = path.join(inputDir, fileName);
  const backupPath = path.join(backupDir, fileName);
  const tmpPath = `${inputPath}.tmp`;

  await fs.promises.copyFile(inputPath, backupPath);

  const image = sharp(inputPath, { failOn: "none" });
  const meta = await image.metadata();
  const sourceWidth = meta.width || targetWidth;
  const sourceHeight = meta.height || targetHeight;

  const scale = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight, 1);
  const resizedWidth = Math.round(sourceWidth * scale);
  const resizedHeight = Math.round(sourceHeight * scale);

  const left = Math.max(0, Math.floor((targetWidth - resizedWidth) / 2));
  const top = Math.max(0, Math.floor((targetHeight - resizedHeight) / 2));

  const fitToSize = scale < 1 || scale === 1
    ? image.resize({
        width: resizedWidth,
        height: resizedHeight,
        fit: "inside",
        withoutEnlargement: true,
      })
    : image;

  await fitToSize
    .extend({
      top,
      bottom: targetHeight - resizedHeight - top,
      left,
      right: targetWidth - resizedWidth - left,
      background,
    })
    .toFile(tmpPath);

  await fs.promises.rename(tmpPath, inputPath);
}

async function main() {
  await ensureDir(backupDir);
  const files = (await fs.promises.readdir(inputDir)).filter((file) =>
    /\.(png|jpe?g|webp)$/i.test(file)
  );

  for (const file of files) {
    await normalizeFile(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
