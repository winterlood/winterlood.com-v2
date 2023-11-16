export const getBlurImage = async (imageUrl: string): Promise<string> => {
  const url = new URL(imageUrl);

  let pathSegments = url.pathname.split("/upload");
  pathSegments = [
    pathSegments[0],
    "/upload",
    "/w_100/e_blur:1000,q_auto,f_webp",
    pathSegments[1],
  ];

  const reqURL = "https://res.cloudinary.com" + pathSegments.join("");

  const response = await fetch(reqURL);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString("base64");

  return `data:image/webp;base64,${data}`;
};
