
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ScoresList from "./ScoresList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { Scores } from "../../types/scores";

const ScoresDetail = () => {
  const { id} = useParams();

  const tableName="Scores";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<Scores>(
    {id: entityId,
     endpoint: '/api/Scores',
     navTo:'/scores'});

     const deleteEntityMutation = useDeleteEntity<Scores>(
      {endpoint:'/api/Scores',
       navTo: '/scores'
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
          <ScoresList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataScores.name}</h3>
        </div> */}
        <ActionButtons 
            display = {dataEntity.juryId}
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/scores/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default ScoresDetail;
