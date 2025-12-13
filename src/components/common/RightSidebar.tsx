import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { Button } from "../ui/button";

function RightSidebar() {
  const { isOpen, title, content, extraButton, closeBar } =
    useRightSidebarStore();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? isOpen : closeBar())}>
      <SheetContent className="!min-w-[300px] md:!min-w-[450px] w-full md:w-fit !max-w-[600px] p-4 h-screen overflow-y-auto overflow-x-hidden">
        <SheetHeader>
          <SheetTitle>
            {title} <span className="text-sm underline ml-4">Edit</span>
          </SheetTitle>
        </SheetHeader>
        <div className="w-full h-full">{content}</div>
        <SheetFooter className="flex flex-end flex-nowrap">
          {extraButton && (
            <Button onClick={extraButton.onClick} variant="default">
              {extraButton.text}
            </Button>
          )}
          {extraButton && (
            <Button variant="outline" onClick={closeBar}>
              Close
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default RightSidebar;
