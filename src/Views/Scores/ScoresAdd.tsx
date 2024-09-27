import { useLocation } from "react-router-dom";
import { useAddEntity } from "../../hooks/useEntityManager";
import { Scores } from "../../types/scores";
import ValidationSummary from "../../ValidationSummary";
import ScoresForm from "./ScoresForm";

const ScoresAdd = () => {
  const addEntityMutation = useAddEntity<Scores>({
    endpoint: '/api/Scores',
    navTo: '/scores'});

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const modal = params.get('modal');

  const entity: Scores = {
    id:0,
    points:0,
    praice:"",
    criticism:"",
    recommendations:"",
    juryId:0,
    imitationId:0,
    modal:""
  };


  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <ScoresForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {modal}
      />
    </>
  );
};

export default ScoresAdd;
