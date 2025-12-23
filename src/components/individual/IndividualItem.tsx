import { Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { memo, useRef } from "react";
import { calculatePriceWithMarkupAndVAT } from "@/utils/price-with-markup";
import { uploadFile } from "@/services/upload.service";
import { toast } from "sonner";
import formatPrice from "@/utils/format-price";

function IndividualItem({ item }: { item: any }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      if (!e.target.files) return;
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      await uploadFile(item.orderItemId, formData);

      toast.success("File Uploaded");
    } catch (error) {
      toast.error("File upload failed please try again later");
    }
  };

  return (
    <div className="w-full px-4 pb-4 text-sm bg-white ">
      <Table className="text-sm">
        <TableBody>
          {/* Satır 1 */}
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Spec #</div>
              <div>{item?.specNo}</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Vendor</div>
              <div>{item?.vendor?.vendorName}</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Phase</div>
              <div>{item?.phase}</div>
            </TableCell>
          </TableRow>

          {/* Satır 2 */}
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Ship to</div>
              <div className="font-bold w-full max-w-[150px] truncate">
                {item?.customer?.name}
              </div>
              <div className="w-full max-w-[150px] truncate">
                {item?.customer?.address}
              </div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Ship From</div>
              <div className="font-bold w-full max-w-[150px] truncate">
                {item?.shipFrom}
              </div>
              <div></div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Notes for this item</div>
              <div className="font-bold max-w-[150px] truncate">
                {item?.notes}
              </div>
              <div></div>
            </TableCell>
          </TableRow>

          {/* Satır 3 */}
          <TableRow className="border-none hover:bg-transparent">
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Location</div>
              <div className="font-bold">{item?.location}</div>
            </TableCell>
            <TableCell className="p-0 py-4 w-1/3 align-top">
              <div className="text-gray-700 mb-2">Category</div>
              <div className="font-bold">{item?.category?.name}</div>
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
            <TableHead className="w-1/5 !h-full">Description</TableHead>
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
              {item?.item?.description ? item?.item?.description : "-"}
            </TableCell>
            <TableCell>$ {formatPrice(item?.unitPrice / 100)}</TableCell>
            <TableCell>{item?.markupPercentage}%</TableCell>
            <TableCell>
              $
              {formatPrice(
                calculatePriceWithMarkupAndVAT(
                  item?.unitPrice,
                  item?.markupPercentage
                )
              )}
            </TableCell>
            <TableCell>{item?.quantity}</TableCell>
            <TableCell>{item?.unitType}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="text-end font-bold">
        Total: $ {formatPrice(item?.totalPrice / 100)}
      </p>
    </div>
  );
}

export default memo(IndividualItem);
