import React, { useState } from "react";
import { Juries } from "../../types/juries";

type Args = {
  entity: Juries;
  submitted: (entity: Juries) => void;
  parent:string | null
};

const JuriesForm = ({ entity, submitted ,parent}: Args) => {
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

      <div className="form-group mt-2">
        <label htmlFor="country">Genero</label>
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Nombre"
         value={concrete.gender}
         onChange={(e) =>
          setConcrete({ ...concrete, gender: e.target.value })
         }
       />
        : 
        null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Descripcion</label>
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Descripcion"
         value={concrete.description}
         onChange={(e) =>
          setConcrete({ ...concrete, description: e.target.value })
         }
       />
        : 
        null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.name && !concrete.gender}
        onClick={onSubmit}
      >
        Guardar
      </button>
    </form>
  );
};

export default JuriesForm;
