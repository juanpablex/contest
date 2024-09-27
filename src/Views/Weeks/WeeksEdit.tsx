import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import WeeksForm from "./WeeksForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { Weeks } from "../../types/weeks";
import { useQueryClient } from "@tanstack/react-query";

const WeeksEdit = () => {
    const queryClient = useQueryClient();
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);
  

  const { data, status, isSuccess } = useFetchEntity<Weeks>(
    {id: entityId, 
     endpoint: '/api/Weeks',
     navTo:'/weeks'
    });

  const updateEntityMutation = useUpdateEntity<Weeks>(
    {endpoint: '/api/Weeks',
     navTo:'/weeks'
    });

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          {data.dateIni.toString() + " - " +data.dateEnd.toString()}
        </h5>
      </div>
      <WeeksForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}     
        />
    </>
  );
};

export default WeeksEdit;
