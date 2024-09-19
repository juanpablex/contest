import { useAddGalaTypes } from "../../hooks/GalaTypesHooks";
import { useAddEntity } from "../../hooks/useEntityManager";
import { GalaTypes } from "../../types/galaTypes";
import ValidationSummary from "../../ValidationSummary";
import GalaTypesForm from "./GalaTypesForm";

const GalaTypesAdd = () => {
  //const addEntityMutation = useAddGalaTypes();
  const addEntityMutation = useAddEntity<GalaTypes>({
    endpoint: '/api/GalaTypes',
    navTo: '/galaTypes'});

  const entity: GalaTypes = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <GalaTypesForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {entity.modal}
      />
    </>
  );
};

export default GalaTypesAdd;
