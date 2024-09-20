import { useAddEntity } from "../../hooks/useEntityManager";
import { Participants } from "../../types/participants";
import ValidationSummary from "../../ValidationSummary";
import ParticipantsForm from "./ParticipantsForm";

const ParticipantsAdd = () => {
  const addEntityMutation = useAddEntity<Participants>({
    endpoint: '/api/Participants',
    navTo: '/participants'});

  const entity: Participants = {
    id:0,
    imitator: "",
    singer:"",
    gender:"",
    age:0,
    modal:""
  };

  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <ParticipantsForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {entity.modal}
      />
    </>
  );
};

export default ParticipantsAdd;
