import { useLocation } from "react-router-dom";
import { useAddEntity } from "../../hooks/useEntityManager";
import { WeeklyPoints } from "../../types/weeklyPoints";
import ValidationSummary from "../../ValidationSummary";
import WeeklyPointsForm from "./WeeklyPointsForm";

const WeeklyPointsAdd = () => {
  const addEntityMutation = useAddEntity<WeeklyPoints>({
    endpoint: '/api/WeeklyPoints',
    navTo: '/weeklyPoints'});

    const {search} = useLocation();
    const params = new URLSearchParams(search);
    const modal = params.get('modal');

  const entity: WeeklyPoints = {
    id:0,
    points: 0,
    position:0,
    participantId:0,
    weekId:0,
    modal:""
  };


  return (
    <>
      {addEntityMutation.isError && (
        <ValidationSummary error={addEntityMutation.error} />
      )}
      <WeeklyPointsForm
        entity={entity}
        submitted={(entity) => addEntityMutation.mutate(entity)}
        parent = {modal}
      />
    </>
  );
};

export default WeeklyPointsAdd;
