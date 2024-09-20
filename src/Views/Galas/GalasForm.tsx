import React, { useState } from "react";
import { Galas } from "../../types/galas";
import Select from "../../components/Select";
import { useFetchEntities, useFetchEntity } from "../../hooks/useEntityManager";
import { GalaTypes } from "../../types/galaTypes";
import GalaTypesModal from "../../modals/GalaTypesModal";

type Args = {
  entity: Galas;
  submitted: (entity: Galas) => void;
  parent:string | null
  
};

const GalasForm = ({ entity, submitted ,parent }: Args) => {
  const [concrete, setConcrete] = useState({ ...entity });
  
  const { data: dataEntity, status:statusEntity, isSuccess:isSuccessEntity } = useFetchEntities<GalaTypes>(
    {endpoint: '/api/GalaTypes',
     navTo: '/galaTypes'
    });

const [selectedValueGalaType,setSelectedValueGalaType]=useState<string | number | "">("");
const[getGalaTypeId/*,setGetPeopleMethodId*/]=useState<(item: GalaTypes)=>number>(()=>(item: { id: number; })=>item.id);  
  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    //entityState.modal=parent;
    submitted(concrete);
  };

  const handleChangeGalaType=(value: any)=>{
    const parsedValue = value ? value: "";
    setSelectedValueGalaType(parsedValue);
    const id = parsedValue;
    setConcrete({...concrete,idType:id});
    
  }

  const [showModalGalaType, setShowModalGalaType]=useState<boolean>(false);
const toggleModalGalaType=(): void=>{
  setShowModalGalaType(!showModalGalaType);
  //console.log("modal",showModalGalaType);
}

const closeModalGalaType = (): void => {
    setShowModalGalaType(false);
  };

  return (
    <form className="mt-2">
      <div className="form-group mt-2">
        <label htmlFor="country">Dia</label>
        {concrete!=null? 
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
        {concrete!=null? 
         <input
         type="text"
         className="form-control"
         placeholder="Fecha"
         value={concrete.date.toString()}
         onChange={(e) =>
          setConcrete({ ...concrete, date: new Date(e.target.value) })
         }
       />
        : 
        null}
      </div>

      <div className="form-group mt-2">
        <label htmlFor="country">Cantidad</label>
        {concrete!=null? 
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
        {concrete!=null? 
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
        {concrete!=null? 
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
          <label htmlFor="country">Tipo de Gala</label>
      
          <div style={{display:'flex',flexDirection:'row'}}>
            <Select
                  data={dataEntity}
                  value={selectedValueGalaType}
                  optionLabel={new Array("name")}
                  onChange={handleChangeGalaType}
                  getId={getGalaTypeId}
            />      
                <button style={{marginLeft:'10px'}}
                    type = "button"
                  className="btn btn-primary mt-2"
                  onClick={toggleModalGalaType}
                  > Nuevo Tipo de Gala
                  </button>
        
          </div>
          
        </div>   
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={!concrete.day && !concrete.date && !concrete.quantity && !concrete.nominated && !concrete.totalNominated && !concrete.idType}
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
    </form>
  );
};

export default GalasForm;
