import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import ImitationsForm from "./ImitationsForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { Imitations } from "../../types/imitations";
import { useQueryClient } from "@tanstack/react-query";

const ImitationsEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a imitation id");
  const entityId = parseInt(id);
  

  const { data, status, isSuccess } = useFetchEntity<Imitations>(
    {id: entityId, 
     endpoint: '/api/Imitations',
     navTo:'/imitations'
    });

  const updateEntityMutation = useUpdateEntity<Imitations>(
    {endpoint: '/api/Imitations',
     navTo:'/imitations'
    });

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
       <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          {data.song.toUpperCase()}
        </h5>
      </div>
      <ImitationsForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}     
        />
    </>
  );
};

export default ImitationsEdit;
