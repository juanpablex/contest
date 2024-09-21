
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ImitationsList from "./ImitationsList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { Imitations } from "../../types/imitations";

const ImitationsDetail = () => {
  const { id} = useParams();

  const tableName="Imitations";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<Imitations>(
    {id: entityId,
     endpoint: '/api/Imitations',
     navTo:'/imitations'});

     const deleteEntityMutation = useDeleteEntity<Imitations>(
      {endpoint:'/api/Imitations',
       navTo: '/imitations'
      });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>Imitation not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <ImitationsList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataImitations.name}</h3>
        </div> */}
        <ActionButtons 
            display = {dataEntity.song}
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/imitations/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default ImitationsDetail;
