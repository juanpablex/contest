import { useLocation } from "react-router-dom";
import { useAddEntity } from "../../hooks/useEntityManager";
import { Weeks } from "../../types/weeks";
import ValidationSummary from "../../ValidationSummary";
import WeeksForm from "./WeeksForm";

const WeeksAdd = () => {
  const addEntityMutation = useAddEntity<Weeks>({
    endpoint: '/api/Weeks',
    navTo: '/weeks'});

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const modal = params.get('modal');

  const entity: Weeks = {
    id:0,
    dateIni:new Date(),
    dateEnd:new Date(),
    modal:""
  };


  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <WeeksForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {modal}
      />
    </>
  );
};

export default WeeksAdd;
