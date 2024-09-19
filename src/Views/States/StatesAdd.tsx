import { useAddEntity } from "../../hooks/useEntityManager";
import { States } from "../../types/states";
import ValidationSummary from "../../ValidationSummary";
import StatesForm from "./StatesForm";

const StatesAdd = () => {
  const addEntityMutation = useAddEntity<States>({
    endpoint: '/api/States',
    navTo: '/states'});

  const entity: States = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <StatesForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {entity.modal}
      />
    </>
  );
};

export default StatesAdd;
