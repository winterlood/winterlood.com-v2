import sharp from "sharp";

export async function getCompressedImageBuffer(imgSrc: string): Promise<Buffer> {
  const imageFile = await fetch(imgSrc);
  const imageBuffer = await imageFile.arrayBuffer();
  const compressedImageBuffer = await sharp(imageBuffer).webp({ quality: 60 }).toBuffer();
  return compressedImageBuffer;
}
