"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosHelpCircleOutline } from "react-icons/io";

export function HelpPopup() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <div className="rounded-lg hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 p-1 text-3xl">
          <IoIosHelpCircleOutline />
        </div>
        {/* <Button variant="outline">
            
        </Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-sm:max-w-[90%] max-sm:max-h-[400px]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Help Guide ❓</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p>
              <b>📝 Creating & Managing Snippets</b>
            </p>
            <ul className="text-sm list-disc">
                <li className="ml-8 mt-2"><b>Ctrl + V</b> → <span className="text-zinc-600 dark:text-zinc-400">Paste and create a new snippet instantly.</span></li>
                <li className="ml-8 mt-2"><b>Drag & Resize </b> → <span className="text-zinc-600 dark:text-zinc-400">Move snippets around and resize them freely.</span></li>
                <li className="ml-8 mt-2"><b>Hover & Delete</b> → <span className="text-zinc-600 dark:text-zinc-400">Hover over a snippet and press the "Delete" key to delete it.</span></li>
                <li className="ml-8 mt-2"><b>Sidebar Search</b> → <span className="text-zinc-600 dark:text-zinc-400">Quickly find snippets and navigate to them.</span></li>
                <li className="ml-8 mt-2"><b>Syntax Highlighting </b> → <span className="text-zinc-600 dark:text-zinc-400">Choose a language for clear, readable code.</span></li>
            </ul>
          </div>
          <div>
            <p>
              <b>📁 Organizing Your Snippets</b>
            </p>
            <ul className="text-sm list-disc">
                <li className="ml-8 mt-2"><b>Folder Structure</b> → <span className="text-zinc-600 dark:text-zinc-400">Keep your snippets neatly grouped in folders and files.</span></li>
            </ul>
          </div>
          <div>
            <p>
              <b>🔄 Import, Export & Backups</b>
            </p>
            <ul className="text-sm list-disc">
                <li className="ml-8 mt-2"><b>Export/Import </b> → <span className="text-zinc-600 dark:text-zinc-400">Save or restore your snippets anytime.</span></li>
                <li className="ml-8 mt-2"><b>Backup Regularly </b> → <span className="text-zinc-600 dark:text-zinc-400">Prevent data loss by keeping backups.</span></li>
            </ul>
          </div>
          <div>
            <p>
              <b>🔐 Local & Private</b>
            </p>
            <ul className="text-sm list-disc">
                <li className="ml-8 mt-2"><b>Your Data Stays in Your Browser </b> → <span className="text-zinc-600 dark:text-zinc-400">Everything is stored locally.</span></li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
