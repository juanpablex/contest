import React, { useState } from "react";
import { WeeklyPoints } from "../../types/weeklyPoints";
import Select from "../../components/Select";
import { useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { Participants } from "../../types/participants";
import ParticipantsModal from "../../modals/ParticipantsModal";
import { Weeks } from "../../types/weeks";
import WeeksModal from "../../modals/WeeksModal";

type Args = {
  entity: WeeklyPoints;
  submitted: (entity: WeeklyPoints) => void;
  parent: string | null

};

const WeeklyPointsForm = ({ entity, submitted, parent }: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });

  const { data: dataEntityGT, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntities<Participants>(
    {
      endpoint: '/api/Participants',
      navTo: '/participants'
    });

  const { data: dataEntityWeek } = useFetchEntities<Weeks>(
    {
      endpoint: '/api/Weeks',
      navTo: '/weeks'
    });

  const [selectedValueParticipant, setSelectedValueParticipant] = useState<string | number | "">("");
  const [selectedValueWeek, setSelectedValueWeek] = useState<string | number | "">("");
  const [getParticipantId/*,setGetPeopleMethodId*/] = useState<(item: Participants) => number>(() => (item: { id: number; }) => item.id);
    const [getWeekId/*,setGetPeopleMethodId*/] = useState<(item: Weeks) => number>(() => (item: { id: number; }) => item.id);
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };


  const handleChangeParticipant = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueParticipant(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, participantId: id });

  }

  const handleChangeWeek = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueWeek(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, weekId: id });

  }

  const [showModalParticipant, setShowModalParticipant] = useState<boolean>(false);
  const toggleModalParticipant = (): void => {
    setShowModalParticipant(!showModalParticipant);
  }

  const [showModalWeek, setShowModalWeek] = useState<boolean>(false);
  const toggleModalWeek = (): void => {
    setShowModalWeek(!showModalWeek);
  }

  return (
    <form className="mt-2">
      <div className="form-group mt-2">
        <label htmlFor="country">Puntos</label>
        {concrete != null ?
          <input
            type="number"
            className="form-control"
            placeholder="Puntos"
            value={concrete.points}
            onChange={(e) =>
              setConcrete({ ...concrete, points: parseFloat(e.target.value) })
            }
          />
          :
          null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Posicion</label>
        {concrete != null ?
          <input
            type="number"
            className="form-control"
            placeholder="Posicion"
            value={concrete.position}
            onChange={(e) =>
              setConcrete({ ...concrete, position: parseInt(e.target.value) })
            }
          />
          :
          null}
      </div>

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Participante</label>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={dataEntityGT}
              value={selectedValueParticipant}
              optionLabel={new Array("singer")}
              onChange={handleChangeParticipant}
              getId={getParticipantId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalParticipant}
            > Nuevo Participante
            </button>

          </div>

        </div>
      </div>      

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Semana</label>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={dataEntityWeek}
              value={selectedValueWeek}
              optionLabel={new Array("dateIni")}
              onChange={handleChangeWeek}
              getId={getWeekId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalWeek}
            > Nueva Semana
            </button>

          </div>

        </div>
      </div>

  

     
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.participantId && !concrete.weekId && !concrete.points && !concrete.position}
        onClick={onSubmit}
      >
        Guardar
      </button>
      <ParticipantsModal open={showModalParticipant} onClose={toggleModalParticipant} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </ParticipantsModal>
     
      <WeeksModal open={showModalWeek} onClose={toggleModalWeek} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </WeeksModal>
    </form>
  );
};

export default WeeklyPointsForm;
