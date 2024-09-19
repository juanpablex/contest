
import {  useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import GalaTypesList from "./GalaTypesList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { GalaTypes } from "../../types/galaTypes";

const GalaTypesDetail = () => {
  const { id} = useParams();

  const tableName="GalaTypes";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  //const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchGalaType(entityId);
  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<GalaTypes>(
    {id: entityId,
     endpoint: '/api/GalaTypes',
     navTo:'/galaTypes'});
  //const deleteEntityMutation = useDeleteGalaTypes();
  const deleteEntityMutation = useDeleteEntity<GalaTypes>(
    {endpoint:'/api/GalaTypes',
     navTo: '/galaTypes'
    });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>GalaType not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Tipos de Gala
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <GalaTypesList/>
        </div>
       
      </div>
      <div className="col-6" >
        <ActionButtons 
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/galaTypes/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default GalaTypesDetail;
