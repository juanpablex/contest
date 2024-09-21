import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import JuriesForm from "./JuriesForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";

const JuriesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchEntity<Juries>(
    {id: entityId, 
     endpoint: '/api/Juries',
     navTo:'/juries'
    });

  const updateEntityMutation = useUpdateEntity<Juries>(
    {endpoint: '/api/Juries',
     navTo:'/juries'
    });

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          {data.name.toUpperCase()}
        </h5>
      </div>
      <JuriesForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}      />
    </>
  );
};

export default JuriesEdit;
