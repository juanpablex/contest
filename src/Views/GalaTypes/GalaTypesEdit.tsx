import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchGalaType, useUpdateGalaTypes } from "../../hooks/GalaTypesHooks";
import ValidationSummary from "../../ValidationSummary";
import GalaTypesForm from "./GalaTypesForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { GalaTypes } from "../../types/galaTypes";

const GalaTypesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a galaType id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchEntity<GalaTypes>(
    {id: entityId, 
     endpoint: '/api/GalaTypes',
     navTo:'/galaTypes'
    });
  const updateEntityMutation = useUpdateEntity<GalaTypes>(
    {endpoint: '/api/GalaTypes',
     navTo:'/galaTypes'
    });
  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <GalaTypesForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}      />
    </>
  );
};

export default GalaTypesEdit;
