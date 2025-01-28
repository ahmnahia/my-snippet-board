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
    // If we find the target ID
    if (eachItem.id === targetId) {
      arrOfIds.push(eachItem.id);

      // If it's a folder, collect all its children recursively
      if (!eachItem.isFile && eachItem.subFoldersAndFiles) {
        getAllChildIds(eachItem.subFoldersAndFiles, arrOfIds);
      }
    }

    // Continue traversing into folders if not the target ID
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
  downloadJson({ allSnippets, folderAndFilesKeys });
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

const downloadJson = (data) => {
  const folderAndFilesKeysWithNewIds = assignNewIds(data.folderAndFilesKeys);
  const flattenedArray = [];
  traverseNestedArray(folderAndFilesKeysWithNewIds, 0, flattenedArray);

  flattenedArray.forEach((ei) => {
    if (data.allSnippets[ei.oldId]) {
      data.allSnippets[ei.id] = data.allSnippets[ei.oldId];
      delete data.allSnippets[ei.oldId];
    }
  });
  const jsonData = JSON.stringify(data, null, 2);
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

  // Clone to avoid mutation
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
      // If not selected, add the item and all its parents
      if (item.isFile) {
        parentPath.push({ ...item });
      } else {
        parentPath.push(JSON.parse(JSON.stringify(item)));
      }
    }
  }

  return updatedItems;
}
