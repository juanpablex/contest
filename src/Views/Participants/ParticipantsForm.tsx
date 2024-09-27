import React, { useState } from "react";
import { Participants } from "../../types/participants";
import { useFetchEntities } from "../../hooks/useEntityManager";
import { States } from "../../types/states";
import Select from "../../components/Select";

type Args = {
  entity: Participants;
  submitted: (entity: Participants) => void;
  parent:string | null
};

const ParticipantsForm = ({ entity, submitted ,parent}: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  const { data: dataEntityState } = useFetchEntities<States>(
    {
      endpoint: '/api/States',
      navTo: '/states'
    });
    const [selectedValueState, setSelectedValueState] = useState<string | number | "">("");
    const [getStateId/*,setGetPeopleMethodId*/] = useState<(item: States) => number>(() => (item: { id: number; }) => item.id);
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };
  const handleChangeState = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueState(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, stateId: id });

  }
  const [showModalState, setShowModalState] = useState<boolean>(false);
  const toggleModalState = (): void => {
    setShowModalState(!showModalState);
  }

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
      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Estado</label>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={dataEntityState}
              value={selectedValueState}
              optionLabel={new Array("name")}
              onChange={handleChangeState}
              getId={getStateId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalState}
            > Nuevo Estado
            </button>

          </div>

        </div>
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
