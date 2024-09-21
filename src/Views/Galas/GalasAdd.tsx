import { useLocation } from "react-router-dom";
import { useAddEntity } from "../../hooks/useEntityManager";
import { Galas } from "../../types/galas";
import ValidationSummary from "../../ValidationSummary";
import GalasForm from "./GalasForm";

const GalasAdd = () => {
  const addEntityMutation = useAddEntity<Galas>({
    endpoint: '/api/Galas',
    navTo: '/galas'});

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const modal = params.get('modal');

  const entity: Galas = {
    id:0,
    day: "",
    date:new Date(),
    quantity:0,
    nominated:0,
    totalNominated:0,
    galaTypeId:0,
    modal:""
  };


  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <GalasForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {modal}
      />
    </>
  );
};

export default GalasAdd;
