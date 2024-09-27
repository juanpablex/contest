import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { Juries } from '../types/juries';
import JuriesForm from '../Views/Juries/JuriesForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const JuriesModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<Juries>({
        endpoint: '/api/Juries',
        navTo: '/juries'});

    const juries: Juries = {
        id: 0,
        name: "",
        gender:"",
        description:"",
        modal: parent
    };


  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Jurado</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <JuriesForm
                        entity ={juries}
                        submitted={(juries) => {addEntityMutation.mutate(juries);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default JuriesModal;