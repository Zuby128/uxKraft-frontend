import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import DatePickerField from "../common/DatePickerField";
import { useState } from "react";

function UpdateTracking() {
  const [stats, setStats] = useState({
    planning: {
      poApprovalDate: null,
      hotelNeedByDate: null,
      expectedDelivery: null,
    },
    production: {
      cfaShopsSend: null,
      cfaShopsApproved: null,
      cfaShopsDelivered: null,
    },
    logistics: {
      orderedDate: null,
      shippedDate: null,
      deliveredDate: null,
      shippingNotes: "",
    },
  });

  const onUpdatePlanning = async (date: any, diff: string, sub: string) => {
    setStats((prev) => ({ ...prev, [diff]: { [sub]: date } }));
  };

  console.log(stats);

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-white">
        <div className="font-bold mb-4">Planning & Requirements</div>
        <div className="grid grid-cols-3 gap-4">
          <DatePickerField
            label={"PO Approval Date"}
            value={(stats?.planning?.poApprovalDate as any) ?? null}
            onChange={(date) =>
              onUpdatePlanning(date, "planning", "poApprovalDate")
            }
          />
          <DatePickerField
            label={"Hotel Need By Date"}
            value={(stats?.planning?.hotelNeedByDate as any) ?? null}
            onChange={(date) =>
              onUpdatePlanning(date, "planning", "hotelNeedByDate")
            }
          />
          <DatePickerField
            label={"Expected Delivery"}
            value={(stats?.planning?.expectedDelivery as any) ?? null}
            onChange={(date) =>
              onUpdatePlanning(date, "planning", "expectedDelivery")
            }
          />
        </div>
      </div>

      {/* ------------ production & shop --------------- */}
      <div className="p-4 bg-white">
        <div className="font-bold mb-4">Production & Shop</div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="mb-2">CFA/Shops Send</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">CFA/Shops Approved</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">CFA/Shops Delivered</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ------------ shipping --------------- */}
      <div className="p-4 bg-white mb-4">
        <div className="font-bold mb-4">Shipping</div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="mb-2">Ordered Date</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Shipped Date</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Delivered Date</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6">
          <Label className="mb-2">Shipping Notes</Label>
          <Textarea placeholder="Delicate product" rows={5} />
        </div>
      </div>
    </div>
  );
}

export default UpdateTracking;
