import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { GalaTypes } from '../types/galaTypes';
import GalaTypesForm from '../Views/GalaTypes/GalaTypesForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const GalaTypesModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<GalaTypes>({
        endpoint: '/api/GalaTypes',
        navTo: '/galaTypes'});

    const galaTypes: GalaTypes = {
        id: 0,
        name: "",
        modal: parent
    };


  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Tipo de Gala</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <GalaTypesForm
                        entity ={galaTypes}
                        submitted={(galaTypes) => {addEntityMutation.mutate(galaTypes);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default GalaTypesModal;