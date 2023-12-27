import "dotenv/config";
import { uploadImageToCloudinary } from "../util/cloudinary";

(async function () {
  const a = await uploadImageToCloudinary({
    imgSrc:
      "https://cdn.inflearn.com/public/courses/330452/cover/7f862bab-8519-4b31-afc6-26cb355833eb/330452-eng.png",
    imageUploadPath: "test",
  });
  console.log(a);
})();
