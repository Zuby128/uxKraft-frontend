import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRightSidebarStore } from "@/store/RightSidebarStore";
import { Button } from "../ui/button";

function RightSidebar() {
  const { isOpen, title, content, description, extraButton, closeBar } =
    useRightSidebarStore();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? isOpen : closeBar())}>
      <SheetContent className="!min-w-[300px] md:!min-w-[450px] w-full md:w-fit !max-w-[600px] p-4 h-screen overflow-y-auto overflow-x-hidden">
        <SheetHeader className="!px-0">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="w-full h-full">{content}</div>
        <SheetFooter className="!flex !flex-row !flex-nowrap gap-2 !px-0">
          {extraButton && (
            <Button variant="outline" onClick={closeBar}>
              Cancel
            </Button>
          )}
          {extraButton && (
            <Button onClick={extraButton.onClick} variant="default">
              {extraButton.text}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default RightSidebar;
