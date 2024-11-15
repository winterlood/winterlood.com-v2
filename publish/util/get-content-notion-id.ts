export function getContentNotionID() {
  const contentType = process.argv[4];
  const contentId = process.argv[5];

  console.log({ contentType, contentId });

  if (
    contentType.toLocaleLowerCase() !== "post" &&
    contentType.toLocaleLowerCase() !== "qna"
  ) {
    throw new Error("스크립트 사용이 잘못되었습니다. TYPE 명시 없음");
  }

  return {
    contentId: contentId.replaceAll('"', ""),
    contentType: contentType.replaceAll('"', ""),
  };
}
