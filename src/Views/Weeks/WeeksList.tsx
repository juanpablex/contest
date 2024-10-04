import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { Weeks } from "../../types/weeks";
import { useFetchEntities } from "../../hooks/useEntityManager";

const WeeksList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Weeks>(
    {endpoint: '/api/Weeks',
     navTo: '/weeks'
    });
  

   if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Semana
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Fecha Inicial</th>
              <th>Fecha Final</th>
            </tr>
          </thead>
            <tbody >
            {dataEntity &&
            dataEntity.map((h: Weeks) => (
              <tr key={h.id} onClick={() => nav(`/weeks/${h.id}`)}>
                <td>{h.dateIni.toString().split("T")[0]}</td>
                <td>{h.dateEnd.toString().split("T")[0]}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to={`/weeks/add?modal=weeks`}>
        Agregar
      </Link>
    </div>
  );
};

export default WeeksList;
