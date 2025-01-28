"use client";

import { addToFolder } from "@/scripts";
import { useRef, useState } from "react";

export default function useExportImportFolderPopup() {
  const folderBtnRef = useRef();
  const fileInputImportRef = useRef();
  const [isExport, setIsExport] = useState(false);
  const [isImport, setIsImport] = useState(false);
  const [dataToImport, setDataToImport] = useState(undefined);

  const handleExportOnClick = () => {
    setIsExport(!isExport);
  };

  const toggleImportState = () => {
    setIsImport(!isImport);
  };

  const handleDataToImport = (importedData) => {
    setDataToImport(importedData);
  };

  const handleFolderImportDestination = (folderId, folderAndFilesKeys) => {
    console.log("before, ", folderAndFilesKeys);
    addToFolder(folderAndFilesKeys, folderId, dataToImport.folderAndFilesKeys);
    console.log("after, ", folderAndFilesKeys);
  };

  return {
    folderBtnRef,
    fileInputImportRef,
    isExport,
    isImport,
    handleExportOnClick,
    toggleImportState,
    handleDataToImport,
    handleFolderImportDestination
  };
}
