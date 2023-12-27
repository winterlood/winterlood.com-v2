export function getContentNotionID() {
  const script = process.env.npm_lifecycle_script;
  if (!script) {
    throw new Error("스크립트를 불러올 수 없습니다.");
  }

  const splitedScripts = script.replace(" --env-file .env", "").split(" ");
  const splitedScriptLength = splitedScripts?.length;
  if (splitedScriptLength !== 4 && splitedScriptLength !== 5) {
    throw new Error("ID혹은 TYPE이 명시되지 않았거나, 스크립트 사용이 잘못되었습니다");
  }

  const contentType = splitedScriptLength === 4 ? splitedScripts[2] : splitedScripts[3];
  const contentId = splitedScriptLength === 4 ? splitedScripts[3] : splitedScripts[4];
  return {
    contentId: contentId.replaceAll('"', ""),
    contentType: contentType.replaceAll('"', ""),
  };
}
