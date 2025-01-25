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

export const getNestedFoldersNFilesIds = (folderAndFilesKeys, targetId, arrOfIds) => {
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
