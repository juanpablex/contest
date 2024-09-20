import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ValidationSummary from "../../ValidationSummary";
import GalasForm from "./GalasForm";
import { useFetchEntity, useUpdateEntity } from "../../hooks/useEntityManager";
import { Galas } from "../../types/galas";
import { useQueryClient } from "@tanstack/react-query";

const GalasEdit = () => {
    const queryClient = useQueryClient();
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);
  

  const { data, status, isSuccess } = useFetchEntity<Galas>(
    {id: entityId, 
     endpoint: '/api/Galas',
     navTo:'/galas'
    });

  const updateEntityMutation = useUpdateEntity<Galas>(
    {endpoint: '/api/Galas',
     navTo:'/galas'
    });

  if (!isSuccess) return <ApiStatus status={status} />;
  const refetchGalaTypes = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/GalaTypes']});
  };
  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <GalasForm
        entity={data}
        submitted={(entity) => {
          updateEntityMutation.mutate(entity);
        } } parent={null}     
        />
    </>
  );
};

export default GalasEdit;