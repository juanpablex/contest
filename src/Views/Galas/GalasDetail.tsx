
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import GalasList from "./GalasList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { Galas } from "../../types/galas";

const GalasDetail = () => {
  const { id} = useParams();

  const tableName="Galas";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<Galas>(
    {id: entityId,
     endpoint: '/api/Galas',
     navTo:'/galas'});

     const deleteEntityMutation = useDeleteEntity<Galas>(
      {endpoint:'/api/Galas',
       navTo: '/galas'
      });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>Gala not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <GalasList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataGalas.name}</h3>
        </div> */}
        <ActionButtons 
            display = {dataEntity.day}
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/galas/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default GalasDetail;
