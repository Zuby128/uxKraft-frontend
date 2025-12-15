import {
  createOrderProduction,
  patchOrderProduction,
} from "@/services/sub-orders.service";
import { toast } from "sonner";
import DatePickerField from "../common/DatePickerField";
import { useOrderItemStore } from "@/store/order-item.store";

function ProductionShop() {
  const { item, updateSection } = useOrderItemStore();

  const onUpdateProduction = async (date: any, title: string) => {
    try {
      if (item?.production?.productionId) {
        const { data } = await patchOrderProduction(
          item?.production?.productionId,
          {
            [title]: date,
          }
        );
        updateSection("production", {
          productionId: data.productionId,
          cfaShopsSend: data.cfaShopsSend,
          cfaShopsApproved: data.cfaShopsApproved,
          cfaShopsDelivered: data.cfaShopsDelivered,
        });
      } else {
        const { data } = await createOrderProduction({
          orderItemId: item?.orderItemId as any,
          [title]: date,
        });
        updateSection("production", {
          productionId: data.productionId,
          cfaShopsSend: data.cfaShopsSend,
          cfaShopsApproved: data.cfaShopsApproved,
          cfaShopsDelivered: data.cfaShopsDelivered,
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
          value={(item?.production?.cfaShopsSend as any) ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsSend")}
        />

        <DatePickerField
          label={"CFA/Shops Approved"}
          value={(item?.production?.cfaShopsApproved as any) ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsApproved")}
        />

        <DatePickerField
          label={"CFA/Shops Delivered"}
          value={(item?.production?.cfaShopsDelivered as any) ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsDelivered")}
        />
      </div>
    </div>
  );
}

export default ProductionShop;
