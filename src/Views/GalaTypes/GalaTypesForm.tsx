import React, { useState } from "react";
import { GalaTypes } from "../../types/galaTypes";

type Args = {
  entity: GalaTypes;
  submitted: (entity: GalaTypes) => void;
  parent:string | null
};

const GalaTypesForm = ({ entity, submitted ,parent}: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //concret.modal=parent;
    submitted(concrete);
   // console.log("state: ", concret);
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

export default GalaTypesForm;
