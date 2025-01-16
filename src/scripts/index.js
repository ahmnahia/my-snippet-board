export const getTranslateXY = (translateString) => {
  return [
    Number(translateString.split("(")[1].split(",")[0].replace("px", "")),
    Number(translateString.split("(")[1].split(",")[1].replace("px)", "")),
  ];
};

export const addNestedFolder = (arr, folderId, folderObj) => {
  if (folderId) {
    return arr.map((eachItem) => {
      if (eachItem.id == folderId) {
        return {
          ...eachItem,
          subFoldersAndFiles: [
            ...(eachItem.subFoldersAndFiles || []),
            folderObj,
          ],
        };
      }
      if (eachItem.subFoldersAndFiles) {
        return {
          ...eachItem,
          subFoldersAndFiles: addNestedFolder(
            eachItem.subFoldersAndFiles,
            folderId,
            folderObj
          ),
        };
      }
      return eachItem;
    });
  } else {
    return [...arr, folderObj];
  }
};

export const editNestedFolderName = (arr, folderId, name) => {
  if (folderId) {
    return arr.map((eachItem) => {
      if (eachItem.id == folderId) {
        return {
          ...eachItem,
          name,
        };
      }
      if (eachItem.subFoldersAndFiles) {
        return {
          ...eachItem,
          subFoldersAndFiles: editNestedFolderName(
            eachItem.subFoldersAndFiles,
            folderId,
            name
          ),
        };
      }
      return eachItem;
    });
  }
};

export const deleteNestedFolder = (arr, folderId) => {
  return arr
    .filter((eachItem) => eachItem.id !== folderId) // Filter out the item with the matching ID
    .map((eachItem) => {
      if (eachItem.subFoldersAndFiles) {
        return {
          ...eachItem,
          subFoldersAndFiles: deleteNestedFolder(
            eachItem.subFoldersAndFiles,
            folderId
          ),
        };
      }
      return eachItem;
    });
};
