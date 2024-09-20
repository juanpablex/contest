import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import ParticipantsForm from "./ParticipantsForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { Participants } from "../../types/participants";

const ParticipantsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchEntity<Participants>(
    {id: entityId, 
     endpoint: '/api/Participants',
     navTo:'/participants'
    });

  const updateEntityMutation = useUpdateEntity<Participants>(
    {endpoint: '/api/Participants',
     navTo:'/participants'
    });

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <ParticipantsForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}      />
    </>
  );
};

export default ParticipantsEdit;
