import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { Imitations } from '../types/imitations';
import ImitationsForm from '../Views/Imitations/ImitationsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const ImitationsModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<Imitations>({
        endpoint: '/api/Imitations',
        navTo: '/imitations'});

    const imitations: Imitations = {
        id: 0,
        order: 0,
        song:"",
        rest:0,
        points:0,
        position:0,
        stateId:0,
        participantId:0,
        galaId:0,
        modal: parent
    };


  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Imitacion</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <ImitationsForm
                        entity ={imitations}
                        submitted={(imitations) => {addEntityMutation.mutate(imitations);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default ImitationsModal;