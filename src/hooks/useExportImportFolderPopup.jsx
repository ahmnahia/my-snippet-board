"use client";

import { useRef, useState } from "react";

export default function useExportImportFolderPopup() {
  const folderBtnRef = useRef();
  const [isExport, setIsExport] = useState(false);

  const handleExportOnClick = () => {
    setIsExport(!isExport);
  }

  return { folderBtnRef, isExport, handleExportOnClick};
}
