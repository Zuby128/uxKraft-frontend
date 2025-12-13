import IndividualItem from "./IndividualItem";
import PlanningRequirements from "./PlanningRequirements";
import ProductionShop from "./ProductionShop";
import Shipping from "./Shipping";

function IndividualItemDetails() {
  return (
    <div className=" flex flex-col gap-4">
      <IndividualItem />
      <PlanningRequirements />
      <ProductionShop />
      <Shipping />
    </div>
  );
}

export default IndividualItemDetails;
