import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import ScoresForm from "./ScoresForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { Scores } from "../../types/scores";
import { useQueryClient } from "@tanstack/react-query";

const ScoresEdit = () => {
    const queryClient = useQueryClient();
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);
  

  const { data, status, isSuccess } = useFetchEntity<Scores>(
    {id: entityId, 
     endpoint: '/api/Scores',
     navTo:'/scores'
    });

  const updateEntityMutation = useUpdateEntity<Scores>(
    {endpoint: '/api/Scores',
     navTo:'/scores'
    });

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          {data.criticism.toUpperCase()}
        </h5>
      </div>
      <ScoresForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}     
        />
    </>
  );
};

export default ScoresEdit;
