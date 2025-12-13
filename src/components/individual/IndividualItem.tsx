import { Download, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useRef } from "react";

function IndividualItem() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <div className="w-full px-4 pb-4 text-sm bg-white ">
      <Table className="text-sm">
        <TableBody>
          {/* Satır 1 */}
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Spec #</div>
              <div>BD-200</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Vendor</div>
              <div>ABC Dapery</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Phase</div>
              <div>1</div>
            </TableCell>
          </TableRow>

          {/* Satır 2 */}
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Ship to</div>
              <div className="font-bold">Sunrise Inn</div>
              <div>BD-200</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Ship From</div>
              <div className="font-bold">ABC Dapery</div>
              <div></div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Notes for this item</div>
              <div className="font-bold">Lorem ipsum dolor sit.</div>
              <div></div>
            </TableCell>
          </TableRow>

          {/* Satır 3 */}
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Location</div>
              <div className="font-bold">Guest Room</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Category</div>
              <div className="font-bold">Dapery</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Upload</div>
              <div className="flex items-center">
                <span className="truncate max-w-40">Lorem, ipsum dolor.</span>
                <Button onClick={handleClick} variant="ghost">
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  multiple={false}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table className="[&_td]:border [&_th]:border border-slate-200 !w-full">
        <TableHeader className="bg-[#f6f3f3]">
          <TableRow>
            <TableHead className="w-1/5">Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Markup</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="w-[200px] !text-wrap !line-clamp-2 ">
              Brand Harmony Lorem ipsum dolor sit amet consectetur adipisicing.
            </TableCell>
            <TableCell>$2.000,00</TableCell>
            <TableCell>20%</TableCell>
            <TableCell>$2.400,00</TableCell>
            <TableCell>2</TableCell>
            <TableCell>each</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default IndividualItem;
