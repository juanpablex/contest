
import { Link, useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import ParticipantsList from "./ParticipantsList";
import ActionButtons from "../../components/ActionButtons";
import { useDeleteEntity, useFetchEntity } from "../../hooks/useEntityManager";
import { Participants } from "../../types/participants";

const ParticipantsDetail = () => {
  const { id} = useParams();

  const tableName="Participants";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataEntity, status: statusEntity, isSuccess:isSuccessEntity } = useFetchEntity<Participants>(
    {id: entityId,
     endpoint: '/api/Participants',
     navTo:'/participants'});

     const deleteEntityMutation = useDeleteEntity<Participants>(
      {endpoint:'/api/Participants',
       navTo: '/participants'
      });

  if (!isSuccessEntity) return <ApiStatus status={statusEntity} />;

  if (!dataEntity) return <div>State not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Participantes
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <ParticipantsList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataParticipants.name}</h3>
        </div> */}
        <ActionButtons 
            entity={dataEntity}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/participants/edit/${dataEntity.id}`}
        />
      </div>
    </div>
  );
};

export default ParticipantsDetail;
