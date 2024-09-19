import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import {containerStyle} from "../../config";
import { useFetchStates } from "../../hooks/StatesHooks";
import { States } from "../../types/states";

const StatesList = () => {
  const nav = useNavigate();
  const { data: dataStates, status:statusStates, isSuccess:isSuccessStates } = useFetchStates();

   if (!isSuccessStates) return <ApiStatus status={statusStates}></ApiStatus>;

  return (
    <div>
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Estados
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
            {dataStates &&
            dataStates.map((h: States) => (
              <tr key={h.id} onClick={() => nav(`/states/${h.id}`)}>
                <td>{h.name}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      <Link className="btn btn-primary" to="/states/add">
        Agregar
      </Link>
    </div>
  );
};

export default StatesList;
