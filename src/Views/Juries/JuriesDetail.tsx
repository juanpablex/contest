
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import JuriesList from "./JuriesList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";

const JuriesDetail = () => {
  const { id} = useParams();

  const tableName="Juries";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<Juries>(
    {id: entityId,
     endpoint: '/api/Juries',
     navTo:'/juries'});

     const deleteEntityMutation = useDeleteEntity<Juries>(
      {endpoint:'/api/Juries',
       navTo: '/juries'
      });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>State not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Jurados
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <JuriesList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataJuries.name}</h3>
        </div> */}
        <ActionButtons 
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/juries/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default JuriesDetail;
