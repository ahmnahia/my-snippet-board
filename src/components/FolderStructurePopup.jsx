"use client";
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
import { FaCode } from "react-icons/fa";

export default function FolderStructurePopup({
  currentFileDestination,
  folderAndFilesKeys,
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button variant="outline" className="w-full capitalize">
            {currentFileDestination}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border ">
          <DialogHeader>
            <DialogTitle>Folder Structure</DialogTitle>
            <DialogDescription className="">
              {/* Make changes to your profile here. Click save when you're done. */}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4 border dark:border-zinc-100 rounded-lg p-2">
              {folderAndFilesKeys.map((eachItem, idx) => {
                if (typeof eachItem == "object") {
                } else if (typeof eachItem == "string") {
                  return (
                    <Button
                      variant="outline"
                      className="px-12"
                      key={eachItem + idx}
                    >
                      <FaCode />
                      {eachItem}
                    </Button>
                  );
                }
              })}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">New Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
