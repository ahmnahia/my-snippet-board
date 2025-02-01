"use client";

import { addToFolder } from "@/scripts";
import { useRef, useState } from "react";
import { ACTIONS } from "./useBoardHook";
import { get, set } from "idb-keyval";

export default function useExportImportFolderPopup(dispatch) {
  const folderBtnRef = useRef();
  const fileInputImportRef = useRef();
  const [isExport, setIsExport] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [dataToImport, setDataToImport] = useState(undefined);

  const handleExportOnClick = () => {
    setIsExport(!isExport);
  };

  const toggleImportState = (bol) => {
    bol ? setIsImport(bol) : setIsImport(!isImport);
  };

  const handleDataToImport = (importedData) => {
    setDataToImport(importedData);
  };

  const handleFolderImportDestination = (folderId, folderAndFilesKeys) => {
    get("allSnippets").then((val) => {
      if (!folderId) {
        //import to root
        dispatch({
          type: ACTIONS.IMPORT_JSON_FILE,
          payload: {
            folderAndFilesKeys: [
              ...folderAndFilesKeys,
              ...dataToImport.folderAndFilesKeys,
            ],
          },
        });
        return;
      }
      addToFolder(
        folderAndFilesKeys,
        folderId,
        dataToImport.folderAndFilesKeys
      );
      dispatch({
        type: ACTIONS.IMPORT_JSON_FILE,
        payload: { folderAndFilesKeys,  },
      });
      const allSnippets = { ...val, ...dataToImport.allSnippets };
      set("allSnippets", allSnippets).then(() => {
        console.log("allsnippets saved", allSnippets);
      });
    });
  };

  return {
    folderBtnRef,
    fileInputImportRef,
    isExport,
    isImport,
    handleExportOnClick,
    toggleImportState,
    handleDataToImport,
    handleFolderImportDestination,
  };
}
