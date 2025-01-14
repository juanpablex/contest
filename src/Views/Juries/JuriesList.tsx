import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { Juries } from "../../types/juries";
import { useFetchEntities } from "../../hooks/useEntityManager";

const JuriesList = () => {
  const nav = useNavigate();
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Juries>(
    {endpoint: '/api/Juries',
     navTo: '/juries'
    });

   if (!isSuccessEntity) return <ApiStatus status={statusEntity}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Jurados
        </h5>
      </div>
      <div style={containerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Genero</th>
              <th>Descripcion</th>
            </tr>
          </thead>
            <tbody >
            {dataEntity &&
            dataEntity.map((h: Juries) => (
              <tr key={h.id} onClick={() => nav(`/juries/${h.id}`)}>
                <td>{h.name}</td>
                <td>{h.gender}</td>
                <td>{h.description}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/juries/add">
        Agregar
      </Link>
    </div>
  );
};

export default JuriesList;
