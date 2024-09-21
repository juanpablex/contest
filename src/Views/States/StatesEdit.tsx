import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import StatesForm from "./StatesForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { States } from "../../types/states";

const StatesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchEntity<States>(
    {id: entityId, 
     endpoint: '/api/States',
     navTo:'/states'
    });

  const updateEntityMutation = useUpdateEntity<States>(
    {endpoint: '/api/States',
     navTo:'/states'
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
      <StatesForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}      />
    </>
  );
};

export default StatesEdit;
