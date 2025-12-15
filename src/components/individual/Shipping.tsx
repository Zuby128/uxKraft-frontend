import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import DatePickerField from "../common/DatePickerField";
import {
  createOrderLogistics,
  patchOrderLogistics,
} from "@/services/sub-orders.service";
import { toast } from "sonner";

function Shipping({ item }: { item: any }) {
  const onUpdatePlanning = async (date: any, title: string) => {
    try {
      if (item?.planning?.planningId) {
        await patchOrderLogistics(item?.planning?.planningId, {
          [title]: date,
        });
      } else {
        await createOrderLogistics({
          orderItemId: item?.orderItemId,
          [title]: date,
        });
      }
      toast("Plan Updated");
    } catch (error) {
      toast("Failed, please try again later");
    }
  };

  return (
    <div className="p-4 bg-white mb-4">
      <div className="font-bold mb-4">Shipping</div>
      <div className="grid grid-cols-3 gap-4 relative">
        <DatePickerField
          label={"Ordered Date"}
          value={item?.logistics?.orderedDate ?? null}
          onChange={(date) => onUpdatePlanning(date, "orderedDate")}
        />
        <DatePickerField
          label={"Shipped Date"}
          value={item?.logistics?.shippedDate ?? null}
          onChange={(date) => onUpdatePlanning(date, "shippedDate")}
        />
        <DatePickerField
          label={"Delivered Date"}
          value={item?.logistics?.deliveredDate ?? null}
          onChange={(date) => onUpdatePlanning(date, "deliveredDate")}
        />
      </div>
      <div className="mt-6">
        <Label className="mb-2">Shipping Notes</Label>
        <Textarea placeholder="Delicate product" rows={5} />
      </div>
    </div>
  );
}

export default Shipping;
