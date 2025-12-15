import { useOrderItemStore } from "@/store/order-item.store";
import IndividualItem from "./IndividualItem";
import PlanningRequirements from "./PlanningRequirements";
import ProductionShop from "./ProductionShop";
import Shipping from "./Shipping";

function IndividualItemDetails() {
  const { item } = useOrderItemStore();
  return (
    <div className=" flex flex-col gap-4">
      <IndividualItem item={item} />
      <PlanningRequirements item={item} />
      <ProductionShop item={item} />
      <Shipping item={item} />
    </div>
  );
}

export default IndividualItemDetails;
