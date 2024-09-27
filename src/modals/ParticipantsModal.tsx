import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { Participants } from '../types/participants';
import ParticipantsForm from '../Views/Participants/ParticipantsForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const ParticipantsModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<Participants>({
        endpoint: '/api/Participants',
        navTo: '/participants'});

    const participants: Participants = {
        id: 0,
        imitator: "",
        singer:"",
        gender:"",
        age:0,
        stateId:0,
        modal: parent
    };


  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Participante</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <ParticipantsForm
                        entity ={participants}
                        submitted={(participants) => {addEntityMutation.mutate(participants);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default ParticipantsModal;