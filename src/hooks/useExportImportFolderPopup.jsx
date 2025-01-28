"use client";

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

  const handleDataToImport = () => {
    
  };

  return {
    folderBtnRef,
    fileInputImportRef,
    isExport,
    isImport,
    handleExportOnClick,
    toggleImportState,
  };
}
