import { toast } from "sonner";
import DatePickerField from "../common/DatePickerField";
import {
  createOrderPlanning,
  patchOrderPlanning,
} from "@/services/sub-orders.service";

function PlanningRequirements({ item }: { item: any }) {
  const onUpdatePlanning = async (date: any, title: string) => {
    try {
      if (item?.planning?.planningId) {
        await patchOrderPlanning(item?.planning?.planningId, { [title]: date });
      } else {
        await createOrderPlanning({
          orderItemId: item?.orderItemId,
          [title]: date,
        });
      }
      toast("Plan Updated");
    } catch (error) {
      toast("Failed, please try again later");
    }
  };

  const checkIsLate = () => {
    const diff =
      new Date(item?.planning?.expectedDelivery).getTime() -
      new Date(item?.planning?.hotelNeedByDate).getTime();
    if (diff > 0) {
      return diff;
    } else {
      return null;
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="font-bold mb-4">Planning & Requirements</div>
      <div className="grid grid-cols-3 gap-4 relative">
        <DatePickerField
          label={"PO Approval Date"}
          value={item?.planning?.poApprovalDate ?? null}
          onChange={(date) => onUpdatePlanning(date, "poApprovalDate")}
        />

        <DatePickerField
          label={"Hotel Need by Date"}
          value={item?.planning?.hotelNeedByDate ?? null}
          onChange={(date) => onUpdatePlanning(date, "hotelNeedByDate")}
        />

        <DatePickerField
          label={"Expected Delivery"}
          value={item?.planning?.expectedDelivery ?? null}
          onChange={(date) => onUpdatePlanning(date, "expectedDelivery")}
        />

        <span className="text-red-500 text-xs absolute -bottom-4 right-0">
          Late by {checkIsLate()} days
        </span>
      </div>
    </div>
  );
}

export default PlanningRequirements;
