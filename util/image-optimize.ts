type Dimensions = {
  width: number;
  height: number;
};

export const getImageBase64DataURL = async (imageUrl: string): Promise<string> => {
  try {
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
  } catch (err) {
    return "";
  }
};

export const getImageDimensions = async (imageUrl: string): Promise<Dimensions> => {
  const url = new URL(imageUrl);

  let pathSegments = url.pathname.split("/upload");
  pathSegments = [pathSegments[0], "/upload", "/fl_getinfo", pathSegments[1]];
  const reqURL = "https://res.cloudinary.com" + pathSegments.join("");

  const response = await fetch(reqURL);
  const json = (await response.json()) as any;

  const dimensions: Dimensions = {
    width: json.output.width,
    height: json.output.height,
  };

  return dimensions;
};
