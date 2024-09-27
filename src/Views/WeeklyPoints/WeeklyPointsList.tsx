import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { containerStyle } from "../../config";
import { WeeklyPoints } from "../../types/weeklyPoints";
import { useFetchEntities } from "../../hooks/useEntityManager";

import { Participants } from "../../types/participants";
import { Weeks } from "../../types/weeks";

const WeeklyPointsList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntities<WeeklyPoints>(
    {
      endpoint: '/api/WeeklyPoints',
      navTo: '/weeklyPoints'
    });
  const { data: dataEntityParticipant } = useFetchEntities<Participants>(
    {
      endpoint: '/api/Participants',
      navTo: '/participants'
    });
    const { data: dataEntityWeek } = useFetchEntities<Weeks>(
      {
        endpoint: '/api/Weeks',
        navTo: '/weeks'
      });
  const getParticipant = (id: any) => {
    const entity: string[] = [];
    dataEntityParticipant?.forEach((element: { id: any; singer: string; }) => {
      if (element.id == id) {
        entity.push(element.singer);
      }
    });
    return entity;
  }
  const getWeek = (id: any) => {
    const entity: string[] = [];
    dataEntityWeek?.forEach((element: { id: any; dateIni: Date; }) => {
      if (element.id == id) {
        entity.push(element.dateIni.toString());
      }
    });
    return entity;
  }


  if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Puntos Semanales
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Participante</th>
              <th>Semana</th>
              <th>Puntos</th>
              <th>Posicion</th>
            </tr>
          </thead>
          <tbody >
            {dataEntity &&
              dataEntity.map((h: WeeklyPoints) => (
                <tr key={h.id} onClick={() => nav(`/weeklyPoints/${h.id}`)}>
                  <td>{getParticipant(h.participantId)}</td>
                  <td>{getWeek(h.weekId)}</td>
                  <td>{h.points}</td>
                  <td>{h.position}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/weeklyPoints/add?modal=weeklyPoints`}>
        Agregar
      </Link>
    </div>
  );
};

export default WeeklyPointsList;
