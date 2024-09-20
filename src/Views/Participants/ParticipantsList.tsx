import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { Participants } from "../../types/participants";
import { useFetchEntities } from "../../hooks/useEntityManager";

const ParticipantsList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Participants>(
    {endpoint: '/api/Participants',
     navTo: '/participants'
    });

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
              <th>Nombre</th>
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
