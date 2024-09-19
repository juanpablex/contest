import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchGalaTypes } from "../../hooks/GalaTypesHooks";
import { GalaTypes } from "../../types/galaTypes";
import { useFetchEntities } from "../../hooks/useEntityManager";

const GalaTypesList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<GalaTypes>(
    {endpoint: '/api/GalaTypes',
     navTo: '/galaTypes'
    });

   if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Tipos De Gala
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
            dataEntity.map((h: GalaTypes) => (
              <tr key={h.id} onClick={() => nav(`/galaTypes/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/galaTypes/add">
        Agregar
      </Link>
    </div>
  );
};

export default GalaTypesList;
