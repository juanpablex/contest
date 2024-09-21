import { useLocation } from "react-router-dom";
import { useAddEntity } from "../../hooks/useEntityManager";
import { Imitations } from "../../types/imitations";
import ValidationSummary from "../../ValidationSummary";
import ImitationsForm from "./ImitationsForm";

const ImitationsAdd = () => {
  const addEntityMutation = useAddEntity<Imitations>({
    endpoint: '/api/Imitations',
    navTo: '/imitations'});

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const modal = params.get('modal');

  const entity: Imitations = {
    id:0,
    order: 0,
    song:"",
    rest:0,
    points:0,
    position:0,
    idState:0,
    idParticipant:0,
    idGala:0,
    modal:""
  };


  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <ImitationsForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {modal}
      />
    </>
  );
};

export default ImitationsAdd;
