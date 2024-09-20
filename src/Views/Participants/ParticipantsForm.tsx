import React, { useState } from "react";
import { Participants } from "../../types/participants";

type Args = {
  entity: Participants;
  submitted: (entity: Participants) => void;
  parent:string | null
};

const ParticipantsForm = ({ entity, submitted ,parent}: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };

  return (
    <form className="mt-2">
      <div className="form-group mt-2">
        <label htmlFor="country">Imitador</label>
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Imitador"
         value={concrete.imitator}
         onChange={(e) =>
          setConcrete({ ...concrete, imitator: e.target.value })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Cantante</label>
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Cantante"
         value={concrete.singer}
         onChange={(e) =>
          setConcrete({ ...concrete, singer: e.target.value })
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
         placeholder="Genero"
         value={concrete.gender}
         onChange={(e) =>
          setConcrete({ ...concrete, gender: e.target.value })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Edad</label>
        {concrete!=null? 
         <input
         type="number"
         className="form-control"
         placeholder="Edad"
         value={concrete.age}
         onChange={(e) =>
          setConcrete({ ...concrete, age: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.imitator && !concrete.singer && !concrete.gender && !concrete.age}
        onClick={onSubmit}
      >
        Guardar
      </button>
    </form>
  );
};

export default ParticipantsForm;
