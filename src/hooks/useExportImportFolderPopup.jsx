"use client";

import { useRef, useState } from "react";

export default function useExportImportFolderPopup() {
  const folderBtnRef = useRef();
  const [isExport, setIsExport] = useState(false);
  const [isImport, setIsImport] = useState(false);

  const handleExportOnClick = () => {
    setIsExport(!isExport);
  };

  const toggleImportState = () => {
    setIsImport(!isImport);
  };

  return { folderBtnRef, isExport, isImport, handleExportOnClick, toggleImportState };
}
