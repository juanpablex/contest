import { useAddStates } from "../../hooks/StatesHooks";
import { States } from "../../types/states";
import ValidationSummary from "../../ValidationSummary";
import StatesForm from "./StatesForm";

const StatesAdd = () => {
  const addStatesMutation = useAddStates();

  const states: States = {
    id:0,
    name: "",
    modal:""
  };

  return (
    <>
      {addStatesMutation.isError && (
        <ValidationSummary error={addStatesMutation.error} />
      )}
      <StatesForm
        entity={states}
        submitted={(states) => addStatesMutation.mutate(states)}
        parent = {states.modal}
      />
    </>
  );
};

export default StatesAdd;
