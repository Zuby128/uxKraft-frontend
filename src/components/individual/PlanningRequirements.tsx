import { toast } from "sonner";
import DatePickerField from "../common/DatePickerField";
import {
  createOrderPlanning,
  patchOrderPlanning,
} from "@/services/sub-orders.service";
import { useOrderItemStore } from "@/store/order-item.store";

function PlanningRequirements() {
  const { item, updateSection } = useOrderItemStore();
  const onUpdatePlanning = async (date: any, title: string) => {
    try {
      if (item?.orderPlanning?.planningId) {
        const { data } = await patchOrderPlanning(
          item?.orderPlanning?.planningId,
          {
            [title]: date,
          }
        );
        updateSection("orderPlanning", {
          planningId: data.planningId,
          poApprovalDate: data.poApprovalDate,
          hotelNeedByDate: data.hotelNeedByDate,
          expectedDelivery: data.expectedDelivery,
        });
      } else {
        const { data } = await createOrderPlanning({
          itemId: item?.itemId as any,
          [title]: date,
        });
        updateSection("orderPlanning", {
          planningId: data.planningId,
          poApprovalDate: data.poApprovalDate,
          hotelNeedByDate: data.hotelNeedByDate,
          expectedDelivery: data.expectedDelivery,
        });
      }
      toast.success("Plan Updated");
    } catch (error) {
      toast.error("Failed, please try again later");
    }
  };

  const getLateDays = (): number | null => {
    if (
      !item?.orderPlanning?.expectedDelivery ||
      !item?.orderPlanning?.hotelNeedByDate
    )
      return null;

    const expected = new Date(
      `${item?.orderPlanning?.expectedDelivery}T00:00:00Z`
    );
    const needBy = new Date(
      `${item?.orderPlanning?.hotelNeedByDate}T00:00:00Z`
    );

    const diffMs = expected.getTime() - needBy.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : null;
  };

  return (
    <div className="p-4 bg-white">
      <div className="font-bold mb-4">Planning & Requirements</div>
      <div className="grid grid-cols-3 gap-4 relative">
        <DatePickerField
          label={"PO Approval Date"}
          value={(item?.orderPlanning?.poApprovalDate as any) ?? null}
          onChange={(date) => onUpdatePlanning(date, "poApprovalDate")}
        />

        <DatePickerField
          label={"Hotel Need by Date"}
          value={(item?.orderPlanning?.hotelNeedByDate as any) ?? null}
          onChange={(date) => onUpdatePlanning(date, "hotelNeedByDate")}
        />

        <DatePickerField
          label={"Expected Delivery"}
          value={(item?.orderPlanning?.expectedDelivery as any) ?? null}
          onChange={(date) => onUpdatePlanning(date, "expectedDelivery")}
        />

        {getLateDays() && (
          <span className="text-red-500 text-xs absolute -bottom-4 right-0">
            Late by {getLateDays()} days
          </span>
        )}
      </div>
    </div>
  );
}

export default PlanningRequirements;
