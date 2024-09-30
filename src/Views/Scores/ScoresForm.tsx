import React, { useState } from "react";
import { Scores } from "../../types/scores";
import Select from "../../components/Select";
import { useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";
import { Imitations } from "../../types/imitations";
import GalaTypesModal from "../../modals/GalaTypesModal";
import JuriesModal from "../../modals/JuriesModal";
import ImitationsModal from "../../modals/ImitationsModal";
import { Participants } from "../../types/participants";
import { Weeks } from "../../types/weeks";
import { Galas } from "../../types/galas";

type Args = {
  entity: Scores;
  submitted: (entity: Scores) => void;
  parent: string | null

};

const ScoresForm = ({ entity, submitted, parent }: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  const [concreteWeek, setConcreteWeek] = useState<Weeks>();
  const [concreteGala, setConcreteGala] = useState<Galas[]>();
  const [concreteImitations, setConcreteImitation] = useState<Imitations[]>();
  const [concreteParticipant, setConcreteParticipant] = useState<Participants[]>();
  const [selectedImitation,setSelectedImitation] = useState<Imitations>();

  const { data: dataEntityJury } = useFetchEntities<Juries>(
    {
      endpoint: '/api/Juries',
      navTo: '/juries'
    });

  const { data: dataEntityImitation } = useFetchEntities<Imitations>(
    {
      endpoint: '/api/Imitations',
      navTo: '/imitations'
    });
  const { data: dataEntityWeek } = useFetchEntities<Weeks>(
    {
      endpoint: '/api/Weeks',
      navTo: '/weeks'
    });
  const { data: dataEntityGala } = useFetchEntities<Galas>(
    {
      endpoint: '/api/Galas',
      navTo: '/galas'
    });
  const { data: dataEntityParticipant } = useFetchEntities<Participants>(
    {
      endpoint: '/api/Participants',
      navTo: '/participants'
    });

  const [selectedValueJury, setSelectedValueJury] = useState<string | number | "">("");
  const [getJuryId/*,setGetPeopleMethodId*/] = useState<(item: Juries) => number>(() => (item: { id: number; }) => item.id);
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };

  const [selectedValueImitation, setSelectedValueImitation] = useState<string | number | "">("");
  const [getImitationId/*,setGetPeopleMethodId*/] = useState<(item: Imitations) => number>(() => (item: { id: number; }) => item.id);

  const [selectedValueParticipant, setSelectedValueParticipant] = useState<string | number | "">("");
  const [getParticipantId/*,setGetPeopleMethodId*/] = useState<(item: Participants) => number>(() => (item: { id: number; }) => item.id);

  const [selectedValueWeek, setSelectedValueWeek] = useState<string | number | "">("");
  const [getWeekId/*,setGetPeopleMethodId*/] = useState<(item: Weeks) => number>(() => (item: { id: number; }) => item.id);

  const [selectedValueGala, setSelectedValueGala] = useState<string | number | "">("");
  const [getGalaId/*,setGetPeopleMethodId*/] = useState<(item: Galas) => number>(() => (item: { id: number; }) => item.id);

  const handleChangeJury = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueJury(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, juryId: id });

  }
  const handleChangeImitation = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueImitation(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, imitationId: id });
    /////////////////////
    const idParticipant = concreteImitations?.find(e => e.id == id)?.participantId;
    //const participants

  }

  const handleChangeWeek = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueWeek(parsedValue);
    const id = parsedValue;
    const galas = dataEntityGala?.filter(e => e.weekId == id);
    setConcreteGala(galas);
  }

  const handleChangeGala = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueGala(parsedValue);
    const id = parsedValue;
    const imitations = dataEntityImitation?.filter(e => e.galaId == id);
    setConcreteImitation(imitations);
    const idParticipants: number[] = [];
    imitations?.forEach(e => idParticipants.push(e.participantId));
    for (var a = 0; a < idParticipants.length; a++) {
      const participant = dataEntityParticipant?.find(e => e.id == idParticipants[a]);
      if (participant) {
        setConcreteParticipant(prevParticipants => [
          ...prevParticipants || [], // Copiamos el estado anterior
          participant           // Añadimos el nuevo participant
        ]);
      }
    }


  }
  const handleChangeParticipant = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueParticipant(parsedValue);
    const id = parsedValue;
    const imitation = concreteImitations?.find(e => e.galaId == selectedValueGala &&
      e.participantId == id);
      console.log("galaid: " + selectedValueGala);
      console.log("participantid: " + id);
      console.log("imitation: " + imitation?.song);
      if(imitation)
      setSelectedImitation(imitation);
    if (imitation) {
      setConcrete({ ...concrete, imitationId: imitation.id });

    }
    

  }

  const [showModalJury, setShowModalJury] = useState<boolean>(false);
  const toggleModalJury = (): void => {
    setShowModalJury(!showModalJury);
    //console.log("modal",showModalGalaType);
  }

  const [showModalImitation, setShowModalImitation] = useState<boolean>(false);
  const toggleModalImitation = (): void => {
    setShowModalImitation(!showModalImitation);
    //console.log("modal",showModalGalaType);
  }


  return (
    <form className="mt-2">

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Semana</label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={dataEntityWeek}
              value={selectedValueWeek}
              optionLabel={new Array("dateIni", "dateEnd")}
              onChange={handleChangeWeek}
              getId={getWeekId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalImitation}
            > Nuevo Particpante
            </button>

          </div>

        </div>
      </div>

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Gala</label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={concreteGala}
              value={selectedValueGala}
              optionLabel={new Array("day")}
              onChange={handleChangeGala}
              getId={getGalaId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalImitation}
            > Nuevo Particpante
            </button>

          </div>

        </div>
      </div>

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Participante</label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={concreteParticipant}
              value={selectedValueParticipant}
              optionLabel={new Array("singer")}
              onChange={handleChangeParticipant}
              getId={getParticipantId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalImitation}
            > Nuevo Particpante
            </button>

          </div>

        </div>
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Imitacion</label>
        {concrete != null ?
          <input
            type="text"
            className="form-control"
            placeholder="Imitacion"
            value={selectedImitation?.song}
            step="0.1"
            onChange={(e) =>
              setConcrete({ ...concrete, points: parseFloat(e.target.value) })
            }
          />
          :
          null}
      </div>
      {/* <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Imitacion</label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={concreteImitations}
              value={selectedValueImitation}
              optionLabel={new Array("song")}
              onChange={handleChangeImitation}
              getId={getImitationId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalImitation}
            > Nueva Imitacion
            </button>

          </div>

        </div>
      </div> */}

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Jurado</label>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={dataEntityJury}
              value={selectedValueJury}
              optionLabel={new Array("name")}
              onChange={handleChangeJury}
              getId={getJuryId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalJury}
            > Nuevo Jurado
            </button>

          </div>

        </div>
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Puntos</label>
        {concrete != null ?
          <input
            type="number"
            className="form-control"
            placeholder="Puntos"
            value={concrete.points}
            step="0.1"
            onChange={(e) =>
              setConcrete({ ...concrete, points: parseFloat(e.target.value) })
            }
          />
          :
          null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Criticas</label>
        {concrete != null ?
          <input
            type="text"
            className="form-control"
            placeholder="Criticas"
            value={concrete.criticism}
            onChange={(e) =>
              setConcrete({ ...concrete, criticism: e.target.value })
            }
          />
          :
          null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Alagos</label>
        {concrete != null ?
          <input
            type="text"
            className="form-control"
            placeholder="Alagos"
            value={concrete.praice}
            onChange={(e) =>
              setConcrete({ ...concrete, praice: e.target.value })
            }
          />
          :
          null}
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Recomendaciones</label>
        {concrete != null ?
          <input
            type="text"
            className="form-control"
            placeholder="Recomendaciones"
            value={concrete.recommendations}
            onChange={(e) =>
              setConcrete({ ...concrete, recommendations: e.target.value })
            }
          />
          :
          null}
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.juryId && !concrete.imitationId}
        onClick={onSubmit}
      >
        Guardar
      </button>
      <JuriesModal open={showModalJury} onClose={toggleModalJury} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </JuriesModal>
      <ImitationsModal open={showModalImitation} onClose={toggleModalImitation} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </ImitationsModal>
    </form>
  );
};

export default ScoresForm;
