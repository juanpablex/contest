import React, { useState } from "react";
import { States } from "../../types/states";

type Args = {
  entity: States;
  submitted: (entity: States) => void;
  parent:string | null
};

const StatesForm = ({ entity, submitted ,parent}: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };

  return (
    <form className="mt-2">
      <div className="form-group mt-2">
        <label htmlFor="country">Nombre</label>
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Nombre"
         value={concrete.name}
         onChange={(e) =>
          setConcrete({ ...concrete, name: e.target.value })
         }
       />
        : 
        null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.name}
        onClick={onSubmit}
      >
        Guardar
      </button>
    </form>
  );
};

export default StatesForm;
