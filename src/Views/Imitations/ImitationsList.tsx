import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { Imitations } from "../../types/imitations";
import { useFetchEntities } from "../../hooks/useEntityManager";
import { Galas } from "../../types/galas";
import { Participants } from "../../types/participants";
import { States } from "../../types/states";

const ImitationsList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Imitations>(
    {endpoint: '/api/Imitations',
     navTo: '/imitations'
    });
    const { data: dataEntityGala} = useFetchEntities<Galas>(
        {endpoint: '/api/Galas',
         navTo: '/galas'
        });
        const { data: dataEntityState} = useFetchEntities<States>(
            {endpoint: '/api/States',
             navTo: '/states'
            });
            const { data: dataEntityParticipant} = useFetchEntities<Participants>(
                {endpoint: '/api/Participants',
                 navTo: '/participants'
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

        const getParticipant=(id:any)=>{
            const entity: string[] = [];
            dataEntityParticipant?.forEach((element: { id: any; singer: string; }) => {
                if(element.id == id){
                    entity.push(element.singer);
                }
            }); 
            return entity;
        }

        const getGala=(id:any)=>{
            const entity: string[] = [];
            dataEntityGala?.forEach((element: { id: any; day: string; }) => {
                if(element.id == id){
                    entity.push(element.day);
                }
            }); 
            return entity;
        }



   if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Imitations
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Gala</th>
              <th>Orden</th>
              <th>Participante</th>
              <th>Cancion</th>
              <th>Puntos</th>
              <th>Posicion</th>
              <th>Estado</th>
              <th>Descanso</th>
            </tr>
          </thead>
            <tbody >
            {dataEntity &&
            dataEntity.map((h: Imitations) => (
              <tr key={h.id} onClick={() => nav(`/imitations/${h.id}`)}>
                <td>{getGala(h.galaId)}</td>
                <td>{h.order}</td>
                <td>{getParticipant(h.participantId)}</td>
                <td>{h.song}</td>
                <td>{h.points}</td>
                <td>{h.position}</td>
                <td>{getState(h.stateId)}</td>
                <td>{h.rest} Días</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/imitations/add?modal=imitations`}>
        Agregar
      </Link>
    </div>
  );
};

export default ImitationsList;
