import React, { useState } from "react";
import { Galas } from "../../types/galas";
import Select from "../../components/Select";
import { useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { GalaTypes } from "../../types/galaTypes";
import GalaTypesModal from "../../modals/GalaTypesModal";
import { States } from "../../types/states";
import StatesModal from "../../modals/StatesModal";
import { Weeks } from "../../types/weeks";
import WeeksModal from "../../modals/WeeksModal";
import { formatDate } from "../../config";

type Args = {
  entity: Galas;
  submitted: (entity: Galas) => void;
  parent: string | null

};

const GalasForm = ({ entity, submitted, parent }: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });

  const { data: dataEntityGT, status: statusEntity, isSuccess: isSuccessEntity } = useFetchEntities<GalaTypes>(
    {
      endpoint: '/api/GalaTypes',
      navTo: '/galaTypes'
    });

  const { data: dataEntityState } = useFetchEntities<States>(
    {
      endpoint: '/api/States',
      navTo: '/states'
    });

  const { data: dataEntityWeek } = useFetchEntities<Weeks>(
    {
      endpoint: '/api/Weeks',
      navTo: '/weeks'
    });

  const [selectedValueGalaType, setSelectedValueGalaType] = useState<string | number | "">("");
  const [selectedValueState, setSelectedValueState] = useState<string | number | "">("");
  const [selectedValueWeek, setSelectedValueWeek] = useState<string | number | "">("");

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [getGalaTypeId/*,setGetPeopleMethodId*/] = useState<(item: GalaTypes) => number>(() => (item: { id: number; }) => item.id);
  const [getStateId/*,setGetPeopleMethodId*/] = useState<(item: States) => number>(() => (item: { id: number; }) => item.id);
  const [getWeekId/*,setGetPeopleMethodId*/] = useState<(item: Weeks) => number>(() => (item: { id: number; }) => item.id);
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };


  const handleChangeGalaType = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueGalaType(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, galaTypeId: id });

  }
  const handleChangeState = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueState(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, stateId: id });

  }

  const handleChangeWeek = (value: any) => {
    const parsedValue = value ? value : "";
    setSelectedValueWeek(parsedValue);
    const id = parsedValue;
    setConcrete({ ...concrete, weekId: id });

  }

  const [showModalGalaType, setShowModalGalaType] = useState<boolean>(false);
  const toggleModalGalaType = (): void => {
    setShowModalGalaType(!showModalGalaType);
  }
  const [showModalState, setShowModalState] = useState<boolean>(false);
  const toggleModalState = (): void => {
    setShowModalState(!showModalState);
  }

  const [showModalWeek, setShowModalWeek] = useState<boolean>(false);
  const toggleModalWeek = (): void => {
    setShowModalWeek(!showModalWeek);
  }

  return (
    <form className="mt-2">
      <div className="form-group mt-2">
        <label htmlFor="country">Dia</label>
        {concrete != null ?
          <input
            type="text"
            className="form-control"
            placeholder="Dia"
            value={concrete.day}
            onChange={(e) =>
              setConcrete({ ...concrete, day: e.target.value })
            }
          />
          :
          null}
      </div>

      <div className="form-group mt-2">
                <label htmlFor="country">Fecha</label>
                {concrete != null ?
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Fecha Inicial"
                        value={concrete.date.toString()}
                        onChange={(e) => {
                            setConcrete({ ...concrete, date: new Date(e.target.value) });
                            setSelectedDate(e.target.value);
                        }}
                    />
                    :
                    null}
                <p>Seleccion: {selectedDate?formatDate(selectedDate):''}</p>
            </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Cantidad</label>
        {concrete != null ?
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad"
            value={concrete.quantity}
            onChange={(e) =>
              setConcrete({ ...concrete, quantity: parseInt(e.target.value) })
            }
          />
          :
          null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Nominados</label>
        {concrete != null ?
          <input
            type="number"
            className="form-control"
            placeholder="Nominados"
            value={concrete.nominated}
            onChange={(e) =>
              setConcrete({ ...concrete, nominated: parseInt(e.target.value) })
            }
          />
          :
          null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Total Nominados</label>
        {concrete != null ?
          <input
            type="number"
            className="form-control"
            placeholder="Total Nominados"
            value={concrete.totalNominated}
            onChange={(e) =>
              setConcrete({ ...concrete, totalNominated: parseInt(e.target.value) })
            }
          />
          :
          null}
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

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Tipo de Gala</label>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Select
              data={dataEntityGT}
              value={selectedValueGalaType}
              optionLabel={new Array("name")}
              onChange={handleChangeGalaType}
              getId={getGalaTypeId}
            />
            <button style={{ marginLeft: '10px' }}
              type="button"
              className="btn btn-primary mt-2"
              onClick={toggleModalGalaType}
            > Nuevo Tipo de Gala
            </button>

          </div>

        </div>
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
        disabled={!concrete.day && !concrete.date && !concrete.quantity && !concrete.nominated && !concrete.totalNominated && !concrete.galaTypeId}
        onClick={onSubmit}
      >
        Guardar
      </button>
      <GalaTypesModal open={showModalGalaType} onClose={toggleModalGalaType} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </GalaTypesModal>
      <StatesModal open={showModalState} onClose={toggleModalState} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </StatesModal>
      <WeeksModal open={showModalWeek} onClose={toggleModalWeek} parent={parent}

      >
        <div>
          Main Content goes here!
        </div>
      </WeeksModal>
    </form>
  );
};

export default GalasForm;
