
import { Link, useParams } from "react-router-dom";
import {  useFetchState,useDeleteStates } from "../../hooks/StatesHooks";
import ApiStatus from "../../apiStatus";
import StatesList from "./StatesList";
import ActionButtons from "../../components/ActionButtons";

const StatesDetail = () => {
  const { id} = useParams();

  const tableName="States";
  if (!id) throw Error(`${tableName} id not found`);
  const entityId = parseInt(id);

  const { data: dataStates, status: statusStates, isSuccess:isSuccessStates } = useFetchState(entityId);
  const deleteEntityMutation = useDeleteStates();

  if (!isSuccessStates) return <ApiStatus status={statusStates} />;

  if (!dataStates) return <div>State not found.</div>;

  return (
    <div className="row" >
      <div className="row mb-2">
        <h5 className="themeFontColor text-center">
          Marcas
        </h5>
      </div>
      <div className="col-6">
        <div className="row">
          <StatesList/>
        </div>
       
      </div>
      <div className="col-6" >
        {/* <div className="row">
          <h3 className="col-12">{dataStates.name}</h3>
        </div> */}
        <ActionButtons 
            entity={dataStates}
            onDelete={deleteEntityMutation.mutate}
            editPath={`/states/edit/${dataStates.id}`}
        />
        {/* <div className="row mt-3">
          <div className="col-4">
            <Link
              className="btn btn-primary" style={{width:"auto"}}
              to={`/states/edit/${dataStates.id}`}
            >
              Editar
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger" style={{width:"auto"}}
              onClick={() => {
                if (window.confirm("¿Estás seguro?"))
                deleteEntityMutation.mutate(dataStates);
              }}
            >
              Borrar
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StatesDetail;
