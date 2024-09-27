
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import WeeksList from "./WeeksList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { Weeks } from "../../types/weeks";

const WeeksDetail = () => {
  const { id} = useParams();

  const tableName="Weeks";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<Weeks>(
    {id: entityId,
     endpoint: '/api/Weeks',
     navTo:'/weeks'});

     const deleteEntityMutation = useDeleteEntity<Weeks>(
      {endpoint:'/api/Weeks',
       navTo: '/weeks'
      });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>Week not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <WeeksList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataWeeks.name}</h3>
        </div> */}
        <ActionButtons 
            display = {dataEntity.dateIni + " - " + dataEntity.dateEnd}
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/weeks/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default WeeksDetail;
