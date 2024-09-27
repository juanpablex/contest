import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { Scores } from "../../types/scores";
import { useFetchEntities } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";
import { Imitations } from "../../types/imitations";


const ScoresList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Scores>(
    {endpoint: '/api/Scores',
     navTo: '/scores'
    });
    const { data: dataEntityJuries } = useFetchEntities<Juries>(
        {endpoint: '/api/Juries',
         navTo: '/juries'
        });
        
    const getJury=(id:any)=>{
        const entity: string[] = [];
        dataEntityJuries?.forEach((element: { id: any; name: string; }) => {
            if(element.id == id){
                entity.push(element.name);
            }
        }); 
        return entity;
    }

    const { data: dataEntityImitation } = useFetchEntities<Imitations>(
        {endpoint: '/api/Imitations',
         navTo: '/imitations'
        });
    const getImitation=(id:any)=>{
        const entity: string[] = [];
        dataEntityImitation?.forEach((element: { id: any; song: string; }) => {
            if(element.id == id){
                entity.push(element.song);
            }
        }); 
        return entity;
    }

   if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Scores
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Jurado</th>
              <th>Imitacion</th>
              <th>Puntos</th>
              <th>Criticas</th>
              <th>Halagos</th>
              <th>Recomendaciones</th>
            </tr>
          </thead>
            <tbody >
            {dataEntity &&
            dataEntity.map((h: Scores) => (
              <tr key={h.id} onClick={() => nav(`/scores/${h.id}`)}>
                <td>{getJury(h.juryId)}</td>
                <td>{getImitation(h.imitationId)}</td>
                <td>{h.points}</td>
                <td>{h.criticism}</td>
                <td>{h.praice}</td>
                <td>{h.recommendations}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/scores/add?modal=scores`}>
        Agregar
      </Link>
    </div>
  );
};

export default ScoresList;
