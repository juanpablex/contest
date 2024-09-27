import { useAddEntity } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";
import ValidationSummary from "../../ValidationSummary";
import JuriesForm from "./JuriesForm";

const JuriesAdd = () => {
  const addEntityMutation = useAddEntity<Juries>({
    endpoint: '/api/Juries',
    navTo: '/juries'});

  const entity: Juries = {
    id:0,
    name: "",
    gender:"",
    description:"",
    modal:""
  };

  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <JuriesForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {entity.modal}
      />
    </>
  );
};

export default JuriesAdd;
