import { useParams } from "react-router-dom";
import ApiStatus from "../../apiStatus";
import { useFetchState, useUpdateStates } from "../../hooks/StatesHooks";
import ValidationSummary from "../../ValidationSummary";
import StatesForm from "./StatesForm";

const StatesEdit = () => {
  const { id } = useParams();
  if (!id) throw Error("Need a state id");
  const entityId = parseInt(id);

  const { data, status, isSuccess } = useFetchState(entityId);
  const updateEntityMutation = useUpdateStates();

  if (!isSuccess) return <ApiStatus status={status} />;

  return (
    <>
      {updateEntityMutation.isError && (
        <ValidationSummary error={updateEntityMutation.error} />
      )}
      <StatesForm
        entity={data}
        submitted={(state) => {
          updateEntityMutation.mutate(state);
        } } parent={null}      />
    </>
  );
};

export default StatesEdit;
