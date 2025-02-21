"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function MultipleTabPopup() {
  return (
      <Dialog open={true} data-dialog="multiple-tabs">
        <DialogTrigger asChild hidden></DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-sm:max-w-[90%] max-sm:max-h-[400px]  overflow-y-auto [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Sorry!</DialogTitle>
            <DialogDescription>
              Multiple tabs currently aren't supported.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  );
}
