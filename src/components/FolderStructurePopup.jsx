"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCode, FaFolder } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
  exportEverything,
  exportSelectedFiles,
  updateSelectedItems,
} from "@/scripts";

const traverseNestedArray = (arr, level, flattenedArray) => {
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

export default function FolderStructurePopup({
  currentFileDestination,
  folderAndFilesKeys,
  actions: {
    addANewFolderOrFile,
    deleteAFolderOrFile,
    editAFolderOrFileName,
    changeFileDestination,
  },
  folderBtnRef,
  handleExportOnClick,
  isExport,
}) {
  const [currentSelectedFileOrFolder, setCurrentSelectedFileOrFolder] =
    useState(undefined);
  const [newFolderAndFilesKeys, setNewFolderAndFilesKeys] = useState([]);
  console.log(folderAndFilesKeys);

  const [flattenedArray, setFlattenedArray] = useState([]);
  const [nameEdit, setNameEdit] = useState("");

  useEffect(() => {
    let temp = [];
    traverseNestedArray(folderAndFilesKeys, 0, temp);
    setFlattenedArray(temp);
  }, [folderAndFilesKeys]);

  useEffect(() => {
    if (isExport) {
      setCurrentSelectedFileOrFolder([]);
      setNewFolderAndFilesKeys([]);
    } else setCurrentSelectedFileOrFolder(undefined);
  }, [isExport]);

  const isItemSelected = (
    folderAndFilesKeys,
    targetId,
    newCurrentSelectedFileOrFolder
  ) => {
    folderAndFilesKeys.map((eachF) => {
      if (eachF.isFile && eachF.id == targetId) {
        newCurrentSelectedFileOrFolder.push(eachF);
      } else if (!eachF.isFile && eachF.id == targetId) {
        newCurrentSelectedFileOrFolder.push(eachF);
      } else if (!eachF.isFile) {
      }
    });
  };

  const ContextMenuWrapper = ({
    children,
    handleClick,
    handleEdit,
    handleDelete,
    buttonStyles,
  }) => {
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Button
            style={buttonStyles}
            variant="outline"
            className="px-2 w-fit text-xs"
            onClick={handleClick}
          >
            {children}
          </Button>
        </ContextMenuTrigger>
        {isExport ? null : (
          <ContextMenuContent>
            <ContextMenuItem onClick={handleEdit}>Edit</ContextMenuItem>
            <ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    );
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog
        onOpenChange={(val) => {
          if (!val && isExport) {
            handleExportOnClick();
            setCurrentSelectedFileOrFolder(undefined);
            setNewFolderAndFilesKeys([]);
          }
        }}
      >
        <DialogTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="w-full capitalize"
            ref={folderBtnRef}
          >
            {currentFileDestination.name}
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] border"
          onClick={() => {
            setCurrentSelectedFileOrFolder(isExport ? [] : undefined);
            isExport && setNewFolderAndFilesKeys([]);
      
          }}
        >
          <DialogHeader>
            <DialogTitle>Folder Structure</DialogTitle>
            <DialogDescription className="">
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="gap-4 border border-zinc-400 dark:border-zinc-100 rounded-lg p-2 flex flex-col h-[300px] overflow-auto">
              {flattenedArray.map((eachItem, idx) => {
                return (
                  <ContextMenuWrapper
                    key={idx}
                    handleClick={(e) => {
                      e.stopPropagation();
                      let temp;
                      if (isExport) {
                        // temp = currentSelectedFileOrFolder.filter(
                        //   (ei) => ei.id == eachItem.id
                        // );
                        // temp =
                        //   temp.length > 0
                        //     ? currentSelectedFileOrFolder.filter(
                        //         (ei) => ei.id != eachItem.id
                        //       )
                        //     : [...currentSelectedFileOrFolder, eachItem];
                        // setCurrentSelectedFileOrFolder(temp);
                        const temp = updateSelectedItems(
                          folderAndFilesKeys,
                          eachItem.id,
                          newFolderAndFilesKeys
                        );
                        setNewFolderAndFilesKeys(temp);
                        console.log("test chatgpt function: ", temp);
                        // fla
                        let temp2 = [];
                        traverseNestedArray(temp, 0, temp2);
                        setCurrentSelectedFileOrFolder(temp2);
                        return;
                      }
                      setCurrentSelectedFileOrFolder(eachItem);
                    }}
                    handleDelete={() => {
                      deleteAFolderOrFile(eachItem.id);
                    }}
                    handleEdit={(e) => {
                      e.stopPropagation();
                      setCurrentSelectedFileOrFolder({
                        ...eachItem,
                        isEdit: true,
                      });
                      setNameEdit(eachItem.name);
                    }}
                    buttonStyles={{
                      backgroundColor: isExport
                        ? currentSelectedFileOrFolder?.filter(
                            (ei) => ei.id == eachItem.id
                          ).length > 0
                          ? "#a1a1aa"
                          : null
                        : eachItem.id == currentSelectedFileOrFolder?.id
                        ? currentSelectedFileOrFolder.isEdit
                          ? "transparent"
                          : "#a1a1aa"
                        : null,
                      marginLeft: 28 * eachItem.level,
                    }}
                  >
                    {eachItem.isFile ? <FaCode /> : <FaFolder />}
                    {currentSelectedFileOrFolder?.id == eachItem.id &&
                    currentSelectedFileOrFolder?.isEdit ? (
                      <Input
                        type="text"
                        className="bg-transparent border-none focus:outline-4 focus:outline-blue-500 w-fit"
                        value={nameEdit}
                        onChange={(e) => {
                          setNameEdit(e.target.value);
                        }}
                        autoFocus
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editAFolderOrFileName(eachItem.id, nameEdit);
                            setNameEdit(false);
                            setCurrentSelectedFileOrFolder(undefined);
                          }
                        }}
                      />
                    ) : (
                      eachItem.name
                    )}
                  </ContextMenuWrapper>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            {isExport ? (
              <div className="flex justify-end w-full">
                <div className="flex gap-2">
                  <Button
                    disabled={currentSelectedFileOrFolder?.length == 0}
                    onClick={() => {
                      exportSelectedFiles(
                        currentSelectedFileOrFolder,
                        folderAndFilesKeys
                      );
                    }}
                  >
                    Export Selected Files
                  </Button>
                  <Button
                    onClick={() => {
                      exportEverything();
                    }}
                  >
                    Export Everything
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full">
                <Button
                  disabled={
                    !currentSelectedFileOrFolder?.isFile ||
                    currentFileDestination.id == currentSelectedFileOrFolder?.id
                  }
                  variant="outline"
                  onClick={(e) => {
                    changeFileDestination(currentSelectedFileOrFolder);
                  }}
                >
                  Open File
                </Button>
                <div className="flex gap-2">
                  <Button
                    disabled={currentSelectedFileOrFolder?.isFile}
                    onClick={(e) => {
                      addANewFolderOrFile(
                        "New File",
                        true,
                        currentSelectedFileOrFolder?.id
                      );
                    }}
                  >
                    New File
                  </Button>
                  <Button
                    disabled={currentSelectedFileOrFolder?.isFile}
                    onClick={(e) => {
                      addANewFolderOrFile(
                        "New Folder",
                        false,
                        currentSelectedFileOrFolder?.id
                      );
                    }}
                  >
                    New Folder
                  </Button>
                </div>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
