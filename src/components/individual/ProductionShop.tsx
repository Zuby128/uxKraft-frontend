import {
  createOrderProduction,
  patchOrderProduction,
} from "@/services/sub-orders.service";
import { toast } from "sonner";
import DatePickerField from "../common/DatePickerField";

function ProductionShop({ item }: { item: any }) {
  const onUpdateProduction = async (date: any, title: string) => {
    try {
      if (item?.planning?.planningId) {
        await patchOrderProduction(item?.planning?.planningId, {
          [title]: date,
        });
      } else {
        await createOrderProduction({
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
    <div className="p-4 bg-white">
      <div className="font-bold mb-4">Production & Shop</div>
      <div className="grid grid-cols-3 gap-4">
        <DatePickerField
          label={"CFA/Shops Send"}
          value={item?.production?.cfaShopsSend ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsSend")}
        />

        <DatePickerField
          label={"CFA/Shops Approved"}
          value={item?.planning?.cfaShopsApproved ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsApproved")}
        />

        <DatePickerField
          label={"CFA/Shops Delivered"}
          value={item?.planning?.cfaShopsDelivered ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsDelivered")}
        />
      </div>
    </div>
  );
}

export default ProductionShop;
