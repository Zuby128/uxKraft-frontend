import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import DatePickerField from "../common/DatePickerField";
import {
  createOrderLogistics,
  patchOrderLogistics,
} from "@/services/sub-orders.service";
import { toast } from "sonner";
import { useOrderItemStore } from "@/store/order-item.store";

function Shipping() {
  const { item, updateSection } = useOrderItemStore();

  const onUpdatePlanning = async (date: any, title: string) => {
    try {
      if (item?.logistics?.logisticsId) {
        const { data } = await patchOrderLogistics(
          item?.logistics?.logisticsId,
          {
            [title]: date,
          }
        );
        updateSection("logistics", {
          logisticsId: data?.logisticsId,
          orderedDate: data?.orderedDate,
          deliveredDate: data?.deliveredDate,
          shippedDate: data?.shippedDate,
          shippingNotes: data?.shippingNotes,
        });
      } else {
        const { data } = await createOrderLogistics({
          orderItemId: item?.orderItemId as any,
          [title]: date,
        });
        updateSection("logistics", {
          logisticsId: data?.logisticsId,
          orderedDate: data?.orderedDate,
          deliveredDate: data?.deliveredDate,
          shippedDate: data?.shippedDate,
          shippingNotes: data?.shippingNotes,
        });
      }
      toast("Plan Updated");
    } catch (error) {
      toast("Failed, please try again later");
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSection("logistics", {
      shippingNotes: e.target.value,
    });
  };

  return (
    <div className="p-4 bg-white mb-4">
      <div className="font-bold mb-4">Shipping</div>
      <div className="grid grid-cols-3 gap-4 relative">
        <DatePickerField
          label={"Ordered Date"}
          value={(item?.logistics?.orderedDate as any) ?? null}
          onChange={(date) => onUpdatePlanning(date, "orderedDate")}
        />
        <DatePickerField
          label={"Shipped Date"}
          value={(item?.logistics?.shippedDate as any) ?? null}
          onChange={(date) => onUpdatePlanning(date, "shippedDate")}
        />
        <DatePickerField
          label={"Delivered Date"}
          value={(item?.logistics?.deliveredDate as any) ?? null}
          onChange={(date) => onUpdatePlanning(date, "deliveredDate")}
        />
      </div>
      <div className="mt-6">
        <Label className="mb-2">Shipping Notes</Label>
        <Textarea
          placeholder="Delicate product"
          className="text-sm"
          value={item?.logistics?.shippingNotes || ""}
          rows={5}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Shipping;
