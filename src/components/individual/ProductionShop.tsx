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
      if (item?.orderProduction?.productionId) {
        const { data } = await patchOrderProduction(
          item?.orderProduction?.productionId,
          {
            [title]: date,
          }
        );
        updateSection("orderProduction", {
          productionId: data.productionId,
          cfaShopsSend: data.cfaShopsSend,
          cfaShopsApproved: data.cfaShopsApproved,
          cfaShopsDelivered: data.cfaShopsDelivered,
        });
      } else {
        const { data } = await createOrderProduction({
          itemId: item?.itemId as any,
          [title]: date,
        });
        updateSection("orderProduction", {
          productionId: data.productionId,
          cfaShopsSend: data.cfaShopsSend,
          cfaShopsApproved: data.cfaShopsApproved,
          cfaShopsDelivered: data.cfaShopsDelivered,
        });
      }
      toast.success("Plan Updated");
    } catch (error) {
      toast.error("Failed, please try again later");
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="font-bold mb-4">Production & Shop</div>
      <div className="grid grid-cols-3 gap-4">
        <DatePickerField
          label={"CFA/Shops Send"}
          value={(item?.orderProduction?.cfaShopsSend as any) ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsSend")}
        />

        <DatePickerField
          label={"CFA/Shops Approved"}
          value={(item?.orderProduction?.cfaShopsApproved as any) ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsApproved")}
        />

        <DatePickerField
          label={"CFA/Shops Delivered"}
          value={(item?.orderProduction?.cfaShopsDelivered as any) ?? null}
          onChange={(date) => onUpdateProduction(date, "cfaShopsDelivered")}
        />
      </div>
    </div>
  );
}

export default ProductionShop;
