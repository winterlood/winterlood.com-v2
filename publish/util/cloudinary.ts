import cloudinary, { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { getCompressedImageBuffer } from "./get-compressed-image-buffer";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function deleteAssetsInFolder(path: string) {
  try {
    const res = await cloudinary.v2.api.delete_resources_by_prefix(path);
    if (res.deleted) {
      console.log(`\t> ${Object.keys(res.deleted).length}개 의 자산 삭제`);
    }
  } catch (err) {
    console.log(`\t> 삭제할 자산이 없습니다`);
  }
}

async function deleteFolder(path: string) {
  try {
    const res = await cloudinary.v2.api.delete_folder(path);
    if (res.deleted) {
      console.log(`\t> \"${path}\"폴더 삭제`);
    }
  } catch (err) {
    console.log(`\t> 삭제할 폴더가 없습니다`);
  }
}

export async function deleteExistCloudinaryAssets({
  contentType,
  contentSlug,
}: {
  contentType: string;
  contentSlug: string;
}) {
  const path = `blog/${contentType}/${contentSlug}`;
  await deleteAssetsInFolder(path);
  await deleteFolder(path);
}

export async function uploadImageToCloudinary({
  imgSrc,
  imageUploadPath,
}: {
  imgSrc: string;
  imageUploadPath: string;
}): Promise<string | undefined> {
  try {
    const compressedImageBuffer = await getCompressedImageBuffer(imgSrc);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: `${imageUploadPath}` },
        (err: any, result?: UploadApiResponse) => {
          if (result) resolve(result.secure_url);
          else reject(err);
        }
      );
      const readable = new Readable({
        read() {
          this.push(compressedImageBuffer);
          this.push(null);
        },
      }).pipe(uploadStream);
    });
  } catch (err) {
    console.log(err);
  }
}
