
import { Link, useParams } from "react-router-dom";
import {  useFetchState,useDeleteStates } from "../../hooks/StatesHooks";
import ApiStatus from "../../apiStatus";
import StatesList from "./StatesList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { States } from "../../types/states";

const StatesDetail = () => {
  const { id} = useParams();

  const tableName="States";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<States>(
    {id: entityId,
     endpoint: '/api/States',
     navTo:'/states'});

     const deleteEntityMutation = useDeleteEntity<States>(
      {endpoint:'/api/States',
       navTo: '/states'
      });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>State not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Estados
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <StatesList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataStates.name}</h3>
        </div> */}
        <ActionButtons 
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/states/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default StatesDetail;
