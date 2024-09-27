import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { Participants } from "../../types/participants";
import { useFetchEntities } from "../../hooks/useEntityManager";
import { States } from "../../types/states";

const ParticipantsList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Participants>(
    {endpoint: '/api/Participants',
     navTo: '/participants'
    });
    const { data: dataEntityState } = useFetchEntities<States>(
      {endpoint: '/api/States',
       navTo: '/states'
      });
      const getState=(id:any)=>{
        const entity: string[] = [];
        dataEntityState?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }
   if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Participantes
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Imitador</th>
              <th>Singer</th>
              <th>Genero</th>
              <th>Edad</th>
              <th>Estado</th>
            </tr>
          </thead>
            <tbody >
            {dataEntity &&
            dataEntity.map((h: Participants) => (
              <tr key={h.id} onClick={() => nav(`/participants/${h.id}`)}>
                <td>{h.imitator}</td>
                <td>{h.singer}</td>
                <td>{h.gender}</td>
                <td>{h.age}</td>
                <td>{getState(h.stateId)}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/participants/add">
        Agregar
      </Link>
    </div>
  );
};

export default ParticipantsList;
