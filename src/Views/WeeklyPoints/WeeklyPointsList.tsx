import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { containerStyle } from "../../config";
import { WeeklyPoints } from "../../types/weeklyPoints";
import { useFetchEntities } from "../../hooks/useEntityManager";

import { Participants } from "../../types/participants";
import { Weeks } from "../../types/weeks";
import { useEffect, useMemo, useState } from "react";

interface showDataInterface {
  id: number,
  participant: string,
  week: string,
  points: number,
  position: number
}

const WeeklyPointsList = () => {
  const nav = useNavigate();
  const [sortConfig, setSortConfig] = useState<{ key: keyof showDataInterface; direction: 'asc' | 'desc' } | null>(null);
  const [showData, setShowData] = useState<showDataInterface[]>([]);
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

      useEffect(() => {
        if (dataEntity && dataEntityParticipant && dataEntityWeek) {
          showDataDetails();
        }
      }, [dataEntity, dataEntityParticipant, dataEntityWeek]);
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

  const showDataDetails = () => {
    const newDataArray: showDataInterface[] = [];
    dataEntity?.forEach(score => {
     
      const week = dataEntityWeek?.find(e => e.id == score?.weekId);
      const participant = dataEntityParticipant?.find(e => e.id == score?.participantId);
      const w = week?.dateIni??"";
      const newData: showDataInterface = {
        id: score.id, participant: participant?.singer ?? "",
        week: w.toString().split("T")[0], points: score.points,
        position: score.position
      }
      setShowData([...showData, newData]);
      newDataArray.push(newData);
    });
    setShowData(newDataArray);
  }
  const handleSort = (key: keyof showDataInterface) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return showData;

    return [...showData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [showData, sortConfig]);
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
              <th style={{color:'coral'}} onClick={() => handleSort('participant')}>Participante</th>
              <th style={{color:'coral'}} onClick={() => handleSort('week')}>Semana</th>
              <th>Puntos</th>
              <th style={{color:'coral'}} onClick={() => handleSort('position')}>Posicion</th>
            </tr>
          </thead>
          <tbody >
            {sortedData && Array.isArray(sortedData) &&
              sortedData
              // .sort((a, b) => {
              //   if (a.position === 0) return 1; // Mueve a 'a' al final
              //   if (b.position === 0) return -1; // Mueve a 'b' al final
              //   if(orderByPosition){
              //     return a.position - b.position; // Ordena normalmente
              //   }else{
              //     return b.position - a.position; // Ordena normalmente
              //   }
                
              // })
              .map((h: showDataInterface) => (
                <tr key={h.id} onClick={() => nav(`/weeklyPoints/${h.id}`)}>
                  <td>{h.participant}</td>
                  <td>{h.week}</td>
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
