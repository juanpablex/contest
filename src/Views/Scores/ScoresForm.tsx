import React, { useState } from "react";
import { Scores } from "../../types/scores";
import Select from "../../components/Select";
import { useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { Juries } from "../../types/juries";
import { Imitations } from "../../types/imitations";
import GalaTypesModal from "../../modals/GalaTypesModal";
import JuriesModal from "../../modals/JuriesModal";
import ImitationsModal from "../../modals/ImitationsModal";

type Args = {
  entity: Scores;
  submitted: (entity: Scores) => void;
  parent:string | null
  
};

const ScoresForm = ({ entity, submitted ,parent }: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  
  const { data: dataEntityJury } = useFetchEntities<Juries>(
    {endpoint: '/api/Juries',
     navTo: '/juries'
    });

    const { data: dataEntityImitation } = useFetchEntities<Imitations>(
        {endpoint: '/api/Imitations',
         navTo: '/imitations'
        });

const [selectedValueJury,setSelectedValueJury]=useState<string | number | "">("");
const[getJuryId/*,setGetPeopleMethodId*/]=useState<(item: Juries)=>number>(()=>(item: { id: number; })=>item.id);  
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };

  const [selectedValueImitation,setSelectedValueImitation]=useState<string | number | "">("");
const[getImitationId/*,setGetPeopleMethodId*/]=useState<(item: Imitations)=>number>(()=>(item: { id: number; })=>item.id);  

  const handleChangeJury=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueJury(parsedValue);
    const id = parsedValue;
    setConcrete({...concrete,juryId:id});
    
  }
  const handleChangeImitation=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueImitation(parsedValue);
    const id = parsedValue;
    setConcrete({...concrete,imitationId:id});
    
  }

  const [showModalJury, setShowModalJury]=useState<boolean>(false);
const toggleModalJury=(): void=>{
  setShowModalJury(!showModalJury);
  //console.log("modal",showModalGalaType);
}

const [showModalImitation, setShowModalImitation]=useState<boolean>(false);
const toggleModalImitation=(): void=>{
  setShowModalImitation(!showModalImitation);
  //console.log("modal",showModalGalaType);
}


  return (
    <form className="mt-2">

      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Imitacion</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataEntityImitation}
                  value={selectedValueImitation}
                  optionLabel={new Array("song")}
                  onChange={handleChangeImitation}
                  getId={getImitationId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalImitation}
                  > Nueva Imitacion
                  </button>
        
          </div>
          
        </div>   
      </div>  
      <div>
        <div className="form-group mt-2" >
          <label htmlFor="country">Jurado</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataEntityJury}
                  value={selectedValueJury}
                  optionLabel={new Array("name")}
                  onChange={handleChangeJury}
                  getId={getJuryId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalJury}
                  > Nuevo Jurado
                  </button>
        
          </div>
          
        </div>   
      </div>  
      <div className="form-group mt-2">
        <label htmlFor="country">Puntos</label>
        {concrete!=null? 
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
        {concrete!=null? 
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
        {concrete!=null? 
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
        {concrete!=null? 
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
        disabled={!concrete.juryId && !concrete.imitationId }
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
