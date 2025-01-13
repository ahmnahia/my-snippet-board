export const getTranslateXY = (translateString) => {
  return [
    Number(translateString.split("(")[1].split(",")[0].replace("px", "")),
    Number(translateString.split("(")[1].split(",")[1].replace("px)", "")),
  ];
};
