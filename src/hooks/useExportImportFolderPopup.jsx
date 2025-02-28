"use client";

import { addToFolder, assignNewIds, traverseNestedArray } from "@/scripts";
import { useRef, useState } from "react";
import { ACTIONS } from "./useBoardHook";
import { get, set } from "idb-keyval";
import { useToast } from "./use-toast";

export default function useExportImportFolderPopup(dispatch) {
  const folderBtnRef = useRef();
  const fileInputImportRef = useRef();
  const [isExport, setIsExport] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [dataToImport, setDataToImport] = useState(undefined);
  const { toast } = useToast();

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
    get("allSnippets")
      .then((val) => {
        const folderAndFilesKeysWithNewIds = assignNewIds(
          dataToImport.folderAndFilesKeys
        );
        const flattenedArray = [];
        traverseNestedArray(folderAndFilesKeysWithNewIds, 0, flattenedArray);

        flattenedArray.forEach((ei) => {
          if (dataToImport.allSnippets) {
            dataToImport.allSnippets[ei.id] =
              dataToImport.allSnippets[ei.oldId];
            delete dataToImport.allSnippets[ei.oldId];
          }
        });

        if (!folderId) {
          //import to root
          dispatch({
            type: ACTIONS.IMPORT_JSON_FILE,
            payload: {
              folderAndFilesKeys: [
                ...folderAndFilesKeys,
                ...folderAndFilesKeysWithNewIds,
              ],
            },
          });
        } else {
          addToFolder(
            folderAndFilesKeys,
            folderId,
            folderAndFilesKeysWithNewIds
          );
          dispatch({
            type: ACTIONS.IMPORT_JSON_FILE,
            payload: { folderAndFilesKeys },
          });
        }
        const allSnippets = { ...val, ...dataToImport.allSnippets };
        set("allSnippets", allSnippets).then(() => {
          console.log("allsnippets saved", allSnippets);
        });

        folderBtnRef.current.click(); // close the folder structure popup
      })
      .catch((error) => {
        toast({
          title: "ERROR!",
          description: "Something wrong with the file imported.",
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
