import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { States } from '../types/states';
import StatesForm from '../Views/States/StatesForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const StatesModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<States>({
        endpoint: '/api/States',
        navTo: '/states'});

    const states: States = {
        id: 0,
        name: "",
        modal: parent
    };


  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Estado</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <StatesForm
                        entity ={states}
                        submitted={(states) => {addEntityMutation.mutate(states);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default StatesModal;