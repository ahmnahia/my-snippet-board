import { get, getMany } from "idb-keyval";

export const getTranslateXY = (translateString) => {
  return [
    Number(translateString.split("(")[1].split(",")[0].replace("px", "")),
    Number(translateString.split("(")[1].split(",")[1].replace("px)", "")),
  ];
};

export const traverseNestedArray = (arr, level, flattenedArray) => {
  arr.forEach((eachItem) => {
    flattenedArray.push({ ...eachItem, level });
    if (eachItem.subFoldersAndFiles) {
      traverseNestedArray(
        eachItem.subFoldersAndFiles,
        level + 1,
        flattenedArray
      );
    }
  });
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

export const getNestedFoldersNFilesIds = (
  folderAndFilesKeys,
  targetId,
  arrOfIds
) => {
  folderAndFilesKeys.forEach((eachItem) => {
    if (eachItem.id === targetId) {
      arrOfIds.push(eachItem.id);

      // if a folder, collect all its children recursively
      if (!eachItem.isFile && eachItem.subFoldersAndFiles) {
        getAllChildIds(eachItem.subFoldersAndFiles, arrOfIds);
      }
    }

    // continue traversing into folders if not the target ID
    if (!eachItem.isFile && eachItem.subFoldersAndFiles) {
      getNestedFoldersNFilesIds(
        eachItem.subFoldersAndFiles,
        targetId,
        arrOfIds
      );
    }
  });
};

// Helper function to collect all child IDs of a folder
const getAllChildIds = (folderContents, arrOfIds) => {
  folderContents.forEach((item) => {
    arrOfIds.push(item.id);
    if (!item.isFile && item.subFoldersAndFiles) {
      getAllChildIds(item.subFoldersAndFiles, arrOfIds); // Recursively add child IDs
    }
  });
};

export const getLastUndoAction = (undoStack) => {
  return undoStack[undoStack.length - 1];
};

export const preformAction = (action, undoStack, redoStack, currentAction) => {
  if (!action.payload.isUndo && !action.payload.isRedo) {
    if (undoStack.length >= 10) undoStack.shift();
    undoStack.push(action);
    redoStack = [];
    return { undoStack, redoStack };
  } else if (action.payload.isUndo) {
    return undo(currentAction, undoStack, redoStack);
  }
};

export const undo = (currentAction, undoStack, redoStack) => {
  if (undoStack.length > 0) {
    if (redoStack.length >= 10) redoStack.shift();
    redoStack.push(currentAction);
    const newAction = undoStack.pop();
    return { undoStack, redoStack, newAction };
  }
};

export const redo = (currentAction, undoStack, redoStack) => {
  if (redoStack.length > 0) {
    undoStack.push(currentAction);
    const newAction = redoStack.pop();
    return { undoStack, redoStack, newAction };
  }
};

export const exportSelectedFiles = async (folderAndFilesKeys) => {
  const allSnippets = await get("allSnippets");
  downloadJson({ allSnippets, folderAndFilesKeys }, true);
};

export const exportEverything = async () => {
  const [allSnippets, folderAndFilesKeys] = await getMany([
    "allSnippets",
    "folderAndFilesKeys",
  ]);

  downloadJson({ allSnippets, folderAndFilesKeys });
};

export function assignNewIds(folderAndFilesKeys) {
  function traverseAndAssign(items) {
    return items.map((item) => {
      const newItem = {
        ...item,
        oldId: item.id, // keeping the old ID
        id: Date.now() + Math.random(),
      };

      if (!item.isFile && item.subFoldersAndFiles) {
        newItem.subFoldersAndFiles = traverseAndAssign(item.subFoldersAndFiles);
      }

      return newItem;
    });
  }

  return traverseAndAssign(folderAndFilesKeys);
}

const downloadJson = async (data, isSelectedFilesOnly = false) => {
  // const folderAndFilesKeysWithNewIds = assignNewIds(data.folderAndFilesKeys);
  const flattenedArray = [];
  traverseNestedArray(data.folderAndFilesKeys, 0, flattenedArray);

  data.allSnippets = data.allSnippets || {};
  const allSnippetsKeys = Object.keys(data.allSnippets);
  if (isSelectedFilesOnly) {
    // filter out the unwanted snippets
    allSnippetsKeys.forEach((ek) => {
      const isFound = flattenedArray.find((ei) => ei.id == ek);
      if (!isFound) delete data.allSnippets[ek];
    });
  }

  const currentFileDestination = await get("currentFileDestination");
  const snippets = await get("snippets");

  flattenedArray.forEach((ei) => {
    if (currentFileDestination?.id == ei.id) {
      //if the file to export is the current file opened add/update to allSnippets
      data.allSnippets[ei.id] = {snippets};
      // delete data.allSnippets[ei.id]; not needed if we not assigning new id
      return;
    }

    //this if statement not needed if we wont assign new ids when exporting
    // if (data.allSnippets && data.allSnippets[ei.id]) {
    //   data.allSnippets[ei.id] = data.allSnippets[ei.id];
    //   delete data.allSnippets[ei.id];
    // }
  });
  const jsonData = JSON.stringify(
    {
      allSnippets: data.allSnippets,
      folderAndFilesKeys: data.folderAndFilesKeys,
    },
    null,
    2
  );
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // create a link element and trigger the download
  const link = document.createElement("a");
  link.href = url;
  link.download = "MySnippetBoardData.json";
  document.body.appendChild(link);
  link.click();

  // clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function updateSelectedItems(array, selectedId, selectedItems = []) {
  // function to find an item and all its parents
  function findItemAndParents(itemArray, targetId, parents = []) {
    for (const item of itemArray) {
      if (item.id === targetId) {
        return { item, parents };
      }
      if (!item.isFile && item.subFoldersAndFiles) {
        const result = findItemAndParents(item.subFoldersAndFiles, targetId, [
          ...parents,
          item,
        ]);
        if (result) return result;
      }
    }
    return null;
  }

  // function to remove an item and its empty parents
  function removeItemAndEmptyParents(itemArray, targetId) {
    return itemArray.filter((item) => {
      if (item.id === targetId) return false;
      if (!item.isFile && item.subFoldersAndFiles) {
        item.subFoldersAndFiles = removeItemAndEmptyParents(
          item.subFoldersAndFiles,
          targetId
        );
        return item.subFoldersAndFiles.length > 0;
      }
      return true;
    });
  }

  // clone to avoid mutation
  let updatedItems = JSON.parse(JSON.stringify(selectedItems));

  const found = findItemAndParents(array, selectedId);

  if (found) {
    const { item, parents } = found;
    const parentPath = parents.reduce((acc, parent) => {
      const existingParent = acc.find((p) => p.id === parent.id);
      if (!existingParent) {
        const newParent = { ...parent, subFoldersAndFiles: [] };
        acc.push(newParent);
        return newParent.subFoldersAndFiles;
      }
      return existingParent.subFoldersAndFiles;
    }, updatedItems);

    const alreadySelected = findItemAndParents(updatedItems, selectedId);

    if (alreadySelected) {
      // if already selected, remove it and clean up empty parents
      updatedItems = removeItemAndEmptyParents(updatedItems, selectedId);
    } else {
      // if not selected, add the item and all its parents
      if (item.isFile) {
        parentPath.push({ ...item });
      } else {
        parentPath.push(JSON.parse(JSON.stringify(item)));
      }
    }
  }

  return updatedItems;
}

// called when importing
export const addToFolder = (structure, folderId, newFolderAndFilesKeys) => {
  // const folderAndFilesKeysWithNewIds = assignNewIds(
  //   dataToImport.folderAndFilesKeys
  // );
  // const flattenedArray = [];
  // traverseNestedArray(folderAndFilesKeysWithNewIds, 0, flattenedArray);

  // console.log("addToFolder():", dataToImport);  

  // flattenedArray.forEach((ei) => {
  //   if (dataToImport.allSnippets && dataToImport.allSnippets[ei.oldId]) {
  //     dataToImport.allSnippets[ei.id] = dataToImport.allSnippets[ei.oldId];
  //     delete dataToImport.allSnippets[ei.oldId];
  //   }
  // });
  function findAndAddToFolder(items) {
    for (const item of items) {
      if (!item.isFile && item.id === folderId) {
        // add newFolderAndFilesKeys to it subFoldersAndFiles
        if (!item.subFoldersAndFiles) item.subFoldersAndFiles = [];
        item.subFoldersAndFiles.push(...newFolderAndFilesKeys);
        return true; // return true to stop further traversal
      }
      if (!item.isFile && item.subFoldersAndFiles) {
        const found = findAndAddToFolder(item.subFoldersAndFiles);
        if (found) return true; // stop recursion if the folder is found
      }
    }
    return false; // return false if the folder is not found
  }

  return findAndAddToFolder(structure);
};
