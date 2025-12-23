import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import DatePickerField from "../common/DatePickerField";
import { useTimeline } from "@/context/TimelineContext";

function UpdateTracking() {
  const { state, updateField } = useTimeline();

  return (
    <div className="flex flex-col gap-4">
      {/* ------------ Planning --------------- */}
      <div className="p-4 bg-white">
        <div className="font-bold mb-4">Planning & Requirements</div>
        <div className="grid grid-cols-3 gap-4">
          <DatePickerField
            label="PO Approval Date"
            value={state.orderPlanning.poApprovalDate as any}
            onChange={(date) =>
              updateField({
                section: "orderPlanning",
                field: "poApprovalDate",
                value: date,
              })
            }
          />

          <DatePickerField
            label="Hotel Need By Date"
            value={state.orderPlanning.hotelNeedByDate as any}
            onChange={(date) =>
              updateField({
                section: "orderPlanning",
                field: "hotelNeedByDate",
                value: date,
              })
            }
          />

          <DatePickerField
            label="Expected Delivery"
            value={state.orderPlanning.expectedDelivery as any}
            onChange={(date) =>
              updateField({
                section: "orderPlanning",
                field: "expectedDelivery",
                value: date,
              })
            }
          />
        </div>
      </div>

      {/* ------------ Production --------------- */}
      <div className="p-4 bg-white">
        <div className="font-bold mb-4">Production & Shop</div>
        <div className="grid grid-cols-3 gap-4">
          <DatePickerField
            label="CFA/Shops Send"
            value={state.orderProduction.cfaShopsSend as any}
            onChange={(date) =>
              updateField({
                section: "orderProduction",
                field: "cfaShopsSend",
                value: date,
              })
            }
          />

          <DatePickerField
            label="CFA/Shops Approved"
            value={state.orderProduction.cfaShopsApproved as any}
            onChange={(date) =>
              updateField({
                section: "orderProduction",
                field: "cfaShopsApproved",
                value: date,
              })
            }
          />

          <DatePickerField
            label="CFA/Shops Delivered"
            value={state.orderProduction.cfaShopsDelivered as any}
            onChange={(date) =>
              updateField({
                section: "orderProduction",
                field: "cfaShopsDelivered",
                value: date,
              })
            }
          />
        </div>
      </div>

      {/* ------------ Shipping --------------- */}
      <div className="p-4 bg-white mb-4">
        <div className="font-bold mb-4">Shipping</div>
        <div className="grid grid-cols-3 gap-4">
          <DatePickerField
            label="Ordered Date"
            value={state.orderLogistics.orderedDate as any}
            onChange={(date) =>
              updateField({
                section: "orderLogistics",
                field: "orderedDate",
                value: date,
              })
            }
          />

          <DatePickerField
            label="Shipped Date"
            value={state.orderLogistics.shippedDate as any}
            onChange={(date) =>
              updateField({
                section: "orderLogistics",
                field: "shippedDate",
                value: date,
              })
            }
          />

          <DatePickerField
            label="Delivered Date"
            value={state.orderLogistics.deliveredDate as any}
            onChange={(date) =>
              updateField({
                section: "orderLogistics",
                field: "deliveredDate",
                value: date,
              })
            }
          />
        </div>

        <div className="mt-6">
          <Label className="mb-2">Shipping Notes</Label>
          <Textarea
            placeholder="Delicate product"
            rows={5}
            value={state.orderLogistics.shippingNotes}
            onChange={(e) =>
              updateField({
                section: "orderLogistics",
                field: "shippingNotes",
                value: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateTracking;
