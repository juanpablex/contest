import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { containerStyle } from "../../config";
import { Imitations } from "../../types/imitations";
import { useFetchEntities } from "../../hooks/useEntityManager";
import { Galas } from "../../types/galas";
import { Participants } from "../../types/participants";
import { States } from "../../types/states";
import { useEffect, useMemo, useState } from "react";


interface showDataInterface {
  id:number,
  galaid: number,
  order: number,
  participant: string,
  song: string,
  points:number,
  position: number,
  stateid: number,
  rest: number
}
const ImitationsList = () => {
  const nav = useNavigate();
  // const [orderByOrder, setOrderByOrder] = useState(false);
  // const [orderByPosition, setOrderByPosition] = useState(true);
  // const [orderByGala, setOrderByGala] = useState(false);
  const [showData,setShowData] = useState<showDataInterface[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof showDataInterface; direction: 'asc' | 'desc' } | null>(null);

  const { data: dataEntity, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntities<Imitations>(
    {
      endpoint: '/api/Imitations',
      navTo: '/imitations'
    });

  const { data: dataEntityGala } = useFetchEntities<Galas>(
    {
      endpoint: '/api/Galas',
      navTo: '/galas'
    });
  const { data: dataEntityState } = useFetchEntities<States>(
    {
      endpoint: '/api/States',
      navTo: '/states'
    });
  const { data: dataEntityParticipant } = useFetchEntities<Participants>(
    {
      endpoint: '/api/Participants',
      navTo: '/participants'
    });

    useEffect(() => {
      if (dataEntity && dataEntityGala && dataEntityState && dataEntityParticipant) {
        showDataDetails();
      }
    }, [dataEntity && dataEntityGala && dataEntityState && dataEntityParticipant]);

  const getState = (id: any) => {
    const entity: string[] = [];
    dataEntityState?.forEach((element: { id: any; name: string; }) => {
      if (element.id == id) {
        entity.push(element.name);
      }
    });
    return entity;
  }

  const getParticipant = (id: any) => {
    const entity: string[] = [];
    dataEntityParticipant?.forEach((element: { id: any; singer: string; }) => {

      if (element.id == id) {
        entity.push(element.singer);
      }
    });
    return entity;
  }

  const getGala = (id: any) => {
    const entity: string[] = [];
    dataEntityGala?.forEach((element: { id: any; day: string; }) => {
      if (element.id == id) {
        entity.push(element.day);
      }
    });
    return entity;
  }

  // const handleByPosition = () => {
  //   setOrderByPosition(true);
  //   setOrderByOrder(false);
  //   setOrderByGala(false);
  // }
  // const handleByOrder = () => {
  //   setOrderByOrder(true);
  //   setOrderByPosition(false);
  //   setOrderByGala(false);
  // }

  // const handleByGala = () => {
  //   setOrderByOrder(false);
  //   setOrderByPosition(false);
  //   setOrderByGala(true);
  // }

  const showDataDetails=()=>{
    const newDataArray:showDataInterface[]=[];
    dataEntity?.forEach(imitation=>{
      const participant=dataEntityParticipant?.find(e=>e.id == imitation?.participantId);
      const newData:showDataInterface={
        id:imitation.id,
        galaid:imitation.galaId,
        order:imitation.order,
        participant: participant?.singer??"",
        song:imitation.song,
        points:imitation.points,
        position:imitation.position,
        stateid:imitation.stateId,
        rest:imitation.rest
      }
      setShowData([...showData,newData]);
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
          Imitations
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th onClick={handleByGala} style={{color:'coral'}}>Gala</th>
              <th onClick={handleByOrder} style={{color:'coral'}}>Orden</th> */}
              <th style={{color:'coral'}} onClick={()=>handleSort('galaid')}>Gala</th>
              <th  style={{color:'coral'}} onClick={()=>handleSort('order')}>Orden</th>
              <th style={{color:'coral'}} onClick={()=>handleSort('participant')}>Participante</th>
              <th style={{color:'coral'}} onClick={()=>handleSort('song')}>Cancion</th>
              <th >Puntos</th>
              {/* <th>Participante</th>
              <th>Cancion</th>
              <th>Puntos</th> */}
              {/* <th onClick={handleByPosition} style={{color:'coral'}}>Posicion</th> */}
              <th  style={{color:'coral'}} onClick={()=>handleSort('position')}>Posicion</th>
              <th>Estado</th>
              <th>Descanso</th>
            </tr>
          </thead>
          <tbody >
            {sortedData && Array.isArray(sortedData) &&
              sortedData
               
                .map((h) => (
                  <tr key={h.id} onClick={() => nav(`/imitations/${h.id}`)}>
                    <td>{getGala(h.galaid)}</td>
                    <td>{h.order}</td>
                    <td>{h.participant}</td>
                    <td>{h.song}</td>
                    <td>{h.points?.toFixed(1)}</td>
                    <td>{h.position}</td>
                    <td>{getState(h.stateid)}</td>
                    <td>{h.rest} Días</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/imitations/add?modal=imitations`} >
        Agregar
      </Link>
    </div>
  );
};

export default ImitationsList;
