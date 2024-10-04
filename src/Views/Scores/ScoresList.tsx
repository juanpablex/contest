import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { containerStyle } from "../../config";
import { Scores } from "../../types/scores";
import { useFetchEntities } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";
import { Imitations } from "../../types/imitations";
import { Galas } from "../../types/galas";
import { useEffect, useMemo, useState } from "react";
import { Participants } from "../../types/participants";

interface showDataInterface {
  id: number,
  jurado: string,
  cancion: string,
  puntos: number,
  criticas: string,
  halagos: string,
  recomendaciones: string,
  dia: string,
  cantante: string
}
const ScoresList = () => {
  const nav = useNavigate();
  const [showData, setShowData] = useState<showDataInterface[]>([]);

  const [sortConfig, setSortConfig] = useState<{ key: keyof showDataInterface; direction: 'asc' | 'desc' } | null>(null);


  const { data: dataEntity, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntities<Scores>(
    {
      endpoint: '/api/Scores',
      navTo: '/scores'
    });
  const { data: dataEntityJuries } = useFetchEntities<Juries>(
    {
      endpoint: '/api/Juries',
      navTo: '/juries'
    });

  const { data: dataEntityGalas } = useFetchEntities<Galas>(
    {
      endpoint: '/api/Galas',
      navTo: '/galas'
    });
  const { data: dataEntityParticipant } = useFetchEntities<Participants>(
    {
      endpoint: '/api/Participants',
      navTo: '/participants'
    });
  const { data: dataEntityImitation } = useFetchEntities<Imitations>(
    {
      endpoint: '/api/Imitations',
      navTo: '/imitations'
    });
  useEffect(() => {
    if (dataEntity && dataEntityJuries && dataEntityImitation && dataEntityGalas && dataEntityParticipant) {
      showDataDetails();
    }
  }, [dataEntity, dataEntityJuries, dataEntityImitation, dataEntityGalas, dataEntityParticipant]);

  const getJury = (id: any) => {
    const entity: string[] = [];
    dataEntityJuries?.forEach((element: { id: any; name: string; }) => {
      if (element.id == id) {
        entity.push(element.name);
      }
    });
    return entity;
  }

  const showDataDetails = () => {
    const newDataArray: showDataInterface[] = [];
    dataEntity?.forEach(score => {
      const jury = dataEntityJuries?.find(e => e.id == score.juryId);
      const imitation = dataEntityImitation?.find(e => e.id == score.imitationId);
      const gala = dataEntityGalas?.find(e => e.id == imitation?.galaId);
      const participant = dataEntityParticipant?.find(e => e.id == imitation?.participantId);
      const newData: showDataInterface = {
        id: score.id, jurado: jury?.name ?? "",
        cancion: imitation?.song ?? "", puntos: score.points,
        criticas: score.criticism, halagos: score.praice,
        recomendaciones: score.recommendations,
        dia: gala?.day ?? "", cantante: participant?.singer ?? ""
      }
      console.log("datashow: " + newData.cantante);
      setShowData([...showData, newData]);
      console.log("asfdf: " + score.id);
      newDataArray.push(newData);
    });
    setShowData(newDataArray);
  }


  const getImitation = (id: any) => {
    const entity: string[] = [];
    dataEntityImitation?.forEach((element: { id: any; song: string; }) => {
      if (element.id == id) {
        entity.push(element.song);
      }
    });
    return entity;
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
          Puntajes
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th>Jurado</th>
              <th>Imitacion</th>
              <th>Puntos</th>
              <th>Criticas</th>
              <th>Halagos</th>
              <th>Recomendaciones</th> */}
             <th style={{color:'coral'}} onClick={() => handleSort('dia')}>Día</th>
              <th style={{color:'coral'}} onClick={() => handleSort('jurado')}>Jurado</th>
              <th style={{color:'coral'}} onClick={() => handleSort('cantante')}>Cantante</th>
              <th style={{color:'coral'}} onClick={() => handleSort('cancion')}>Canción</th>
              <th style={{color:'coral'}} onClick={() => handleSort('puntos')}>Puntos</th>
              <th>Criticas</th>
              <th>Halagos</th>
              <th>Recomendaciones</th>
            </tr>
          </thead>
          <tbody >
            {/* {dataEntity &&
              dataEntity.map((h: Scores) => (
                <tr key={h.id} onClick={() => nav(`/scores/${h.id}`)}>
                  <td>{getJury(h.juryId)}</td>
                  <td>{getImitation(h.imitationId)}</td>
                  <td>{h.points}</td>
                  <td>{h.criticism}</td>
                  <td>{h.praice}</td>
                  <td>{h.recommendations}</td>
                </tr>
              ))} */}
            {sortedData && Array.isArray(sortedData) &&
              sortedData
                // .sort((a, b) => {
                //   if (orderBy[0]) {
                //     // Primero ordena por día
                //     if (a.id !== b.id) {
                //       return a.id - b.id; // Ordena por número de día
                //     }

                //     // Luego ordena por posición
                //     if (a.position === 0) return 1; // Mueve a 'a' al final si position es 0
                //     if (b.position === 0) return -1; // Mueve a 'b' al final si position es 0
                //     return a.position - b.position; // Ordena normalmente
                //   } else {
                //     if (orderByOrder) {
                //       // Primero ordena por día
                //       if (a.galaId !== b.galaId) {
                //         return a.galaId - b.galaId; // Ordena por número de día
                //       }

                //       // Luego ordena por posición
                //       if (a.order === 0) return 1; // Mueve a 'a' al final si position es 0
                //       if (b.order === 0) return -1; // Mueve a 'b' al final si position es 0
                //       return a.order - b.order; // Ordena normalmente
                //     } else {

                //       return b.galaId - a.galaId; // Ordena por número de día

                //     }

                //   }
                // })
                .map((h: showDataInterface) => (
                  <tr key={h.id} onClick={() => nav(`/scores/${h.id}`)}>
                    <td>{h.dia}</td>
                    <td>{h.jurado}</td>
                    <td>{h.cantante}</td>
                    <td>{h.cancion}</td>
                    <td>{h.puntos}</td>
                    <td>{h.criticas}</td>
                    <td>{h.halagos}</td>
                    <td>{h.recomendaciones}</td>
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
