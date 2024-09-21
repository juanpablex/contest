import React, { useState } from "react";
import { Imitations } from "../../types/imitations";
import Select from "../../components/Select";
import { useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { Participants } from "../../types/participants";
import { States } from "../../types/states";
import { Galas } from "../../types/galas";
import ParticipantsModal from "../../modals/ParticipansModal";
import StatesModal from "../../modals/StatesModal";
import GalasModal from "../../modals/GalasModal";

type Args = {
  entity: Imitations;
  submitted: (entity: Imitations) => void;
  parent:string | null
  
};

const ImitationsForm = ({ entity, submitted ,parent }: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  
  const { data: dataEntityGala, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<Galas>(
    {endpoint: '/api/Galas',
     navTo: '/galas'
    });
    const { data: dataEntityParticipant } = useFetchEntities<Participants>(
        {endpoint: '/api/Participants',
         navTo: '/participants'
        });
        const { data: dataEntityState } = useFetchEntities<States>(
            {endpoint: '/api/States',
             navTo: '/states'
            });

const [selectedValueGala,setSelectedValueGala]=useState<string | number | "">("");
const [selectedValueParticipant,setSelectedValueParticipant]=useState<string | number | "">("");
const [selectedValueState,setSelectedValueState]=useState<string | number | "">("");
const[getGalaId/*,setGetPeopleMethodId*/]=useState<(item: Galas)=>number>(()=>(item: { id: number; })=>item.id);  
const[getParticipantId/*,setGetPeopleMethodId*/]=useState<(item: Participants)=>number>(()=>(item: { id: number; })=>item.id);  
const[getStatesId/*,setGetPeopleMethodId*/]=useState<(item: States)=>number>(()=>(item: { id: number; })=>item.id);  
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    console.log(
        'submitted: ' + concrete
    )
    submitted(concrete);
  };

  const handleChangeGala=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueGala(parsedValue);
    const id = parsedValue;
    setConcrete({...concrete,idGala:id});
    
  }
  const handleChangeParticipant=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueParticipant(parsedValue);
    const id = parsedValue;
    setConcrete({...concrete,idParticipant:id});
    
  }
  const handleChangeState=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueState(parsedValue);
    const id = parsedValue;
    setConcrete({...concrete,idState:id});
    
  }

  const [showModalGala, setShowModalGala]=useState<boolean>(false);
const toggleModalGala=(): void=>{
  setShowModalGala(!showModalGala);
  //console.log("modal",showModalGalaType);
}

const [showModalParticipant, setShowModalParticipant]=useState<boolean>(false);
const toggleModalParticipant=(): void=>{
  setShowModalParticipant(!showModalParticipant);
  //console.log("modal",showModalGalaType);
}
const [showModalState, setShowModalState]=useState<boolean>(false);
const toggleModalState=(): void=>{
  setShowModalState(!showModalState);
  //console.log("modal",showModalGalaType);
}



  return (
    <form className="mt-2">
        <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Gala</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataEntityGala}
                  value={selectedValueGala}
                  optionLabel={new Array("day")}
                  onChange={handleChangeGala}
                  getId={getGalaId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalGala}
                  > Nueva Gala
                  </button>
        
          </div>
          
        </div>   
      </div>

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Participante</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataEntityParticipant}
                  value={selectedValueParticipant}
                  optionLabel={new Array("singer")}
                  onChange={handleChangeParticipant}
                  getId={getParticipantId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalParticipant}
                  > Nuevo Participante
                  </button>
        
          </div>
          
        </div>   
      </div>

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Estado</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataEntityState}
                  value={selectedValueState}
                  optionLabel={new Array("name")}
                  onChange={handleChangeState}
                  getId={getStatesId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalState}
                  > Nuevo Estado
                  </button>
        
          </div>
          
        </div>   
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Orden</label>
        {concrete!=null? 
         <input
         type="number"
         className="form-control"
         placeholder="Orden"
         value={concrete.order}
         onChange={(e) =>
          setConcrete({ ...concrete, order: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Cancion</label>
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Cancion"
         value={concrete.song.toString()}
         onChange={(e) =>
          setConcrete({ ...concrete, song: e.target.value })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Puntos</label>
        {concrete!=null? 
         <input
         type="number"
         className="form-control"
         placeholder="Puntos"
         value={concrete.points}
         onChange={(e) =>
          setConcrete({ ...concrete, points: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Posicion</label>
        {concrete!=null? 
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

      <div className="form-group mt-2">
        <label htmlFor="country">Descanso</label>
        {concrete!=null? 
         <input
         type="number"
         className="form-control"
         placeholder="Descanso"
         value={concrete.rest}
         onChange={(e) =>
          setConcrete({ ...concrete, rest: parseInt(e.target.value) })
         }
       />
        : 
        null}
      </div>

      
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.order && !concrete.song && !concrete.rest && !concrete.idState
                  && !concrete.idParticipant && !concrete.idGala
        }
        onClick={onSubmit}
      >
        Guardar
      </button>
      <GalasModal open={showModalGala} onClose={toggleModalGala} parent={parent}
                    
      >
                <div>
                    Main Content goes here!
                </div>
      </GalasModal>
      <ParticipantsModal open={showModalParticipant} onClose={toggleModalParticipant} parent={parent}
                    
      >
                <div>
                    Main Content goes here!
                </div>
      </ParticipantsModal>
      <StatesModal open={showModalState} onClose={toggleModalState} parent={parent}
                    
      >
                <div>
                    Main Content goes here!
                </div>
      </StatesModal>

      
    </form>
  );
};

export default ImitationsForm;
