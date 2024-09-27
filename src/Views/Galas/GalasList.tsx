import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { containerStyle } from "../../config";
import { Galas } from "../../types/galas";
import { useFetchEntities } from "../../hooks/useEntityManager";

import { GalaTypes } from "../../types/galaTypes";
import { States } from "../../types/states";
import { Weeks } from "../../types/weeks";

const GalasList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntities<Galas>(
    {
      endpoint: '/api/Galas',
      navTo: '/galas'
    });
  const { data: dataEntityGalaType } = useFetchEntities<GalaTypes>(
    {
      endpoint: '/api/GalaTypes',
      navTo: '/galaTypes'
    });
  const { data: dataEntityState } = useFetchEntities<States>(
    {
      endpoint: '/api/States',
      navTo: '/states'
    });
    const { data: dataEntityWeek } = useFetchEntities<Weeks>(
      {
        endpoint: '/api/Weeks',
        navTo: '/weeks'
      });
  const getGalaType = (id: any) => {
    const entity: string[] = [];
    dataEntityGalaType?.forEach((element: { id: any; name: string; }) => {
      if (element.id == id) {
        entity.push(element.name);
      }
    });
    return entity;
  }
  const getState = (id: any) => {
    const entity: string[] = [];
    dataEntityState?.forEach((element: { id: any; name: string; }) => {
      if (element.id == id) {
        entity.push(element.name);
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
          Galas
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Dia</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Nominados</th>
              <th>Total Nominados</th>
              <th>Tipo de Gala</th>
              <th>Semana</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody >
            {dataEntity &&
              dataEntity.map((h: Galas) => (
                <tr key={h.id} onClick={() => nav(`/galas/${h.id}`)}>
                  <td>{h.day}</td>
                  <td>{h.date.toString()}</td>
                  <td>{h.quantity}</td>
                  <td>{h.nominated}</td>
                  <td>{h.totalNominated}</td>
                  <td>{getGalaType(h.galaTypeId)}</td>
                  <td>{getWeek(h.weekId)}</td>
                  <td>{getState(h.stateId)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/galas/add?modal=galas`}>
        Agregar
      </Link>
    </div>
  );
};

export default GalasList;
