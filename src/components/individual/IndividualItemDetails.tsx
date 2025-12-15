import { useOrderItemStore } from "@/store/order-item.store";
import IndividualItem from "./IndividualItem";
import DateSection from "../common/DateSection";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

function IndividualItemDetails() {
  const { item, updateSection } = useOrderItemStore();
  return (
    <div className=" flex flex-col gap-4">
      <IndividualItem item={item} />
      <DateSection
        title="Planning & Requirements"
        sectionKey="planning"
        data={item?.planning}
        fields={[
          { key: "poApprovalDate", label: "PO Approval Date" },
          { key: "hotelNeedByDate", label: "Hotel Need By Date" },
          { key: "expectedDelivery", label: "Expected Delivery" },
        ]}
        onChange={(field, value) =>
          updateSection("planning", { [field]: value })
        }
      />
      <DateSection
        title="Production & Shop"
        sectionKey="production"
        data={item?.production}
        fields={[
          { key: "cfaShopsSend", label: "CFA Shops Send" },
          { key: "cfaShopsApproved", label: "CFA Shops Approved" },
          { key: "cfaShopsDelivered", label: "CFA Shops Delivered" },
        ]}
        onChange={(field, value) =>
          updateSection("production", { [field]: value })
        }
      />

      <DateSection
        title="Shipping"
        sectionKey="logistics"
        data={item?.logistics}
        fields={[
          { key: "orderedDate", label: "Ordered Date" },
          { key: "shippedDate", label: "Shipped Date" },
          { key: "deliveredDate", label: "Delivered Date" },
        ]}
        onChange={(field, value) =>
          updateSection("logistics", { [field]: value })
        }
      />
      <div className="mt-0 px-4 bg-white">
        <Label className="mb-2">Shipping Notes</Label>
        <Textarea placeholder="Delicate product" rows={5} />
      </div>
    </div>
  );
}

export default IndividualItemDetails;
