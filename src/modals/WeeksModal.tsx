import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { Weeks } from '../types/weeks';
import WeeksForm from '../Views/Weeks/WeeksForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const WeeksModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<Weeks>({
        endpoint: '/api/Weeks',
        navTo: '/weeks'});

    const weeks: Weeks = {
        id: 0,
        dateIni: new Date(),
        dateEnd:new Date(),
        modal: parent
    };


  
    return (
        <div className={`modal ${open ? "display-block" : "display-none"}`}>
            <div className="modal-main">
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <div className="modal-head">
                    <h1>Agregar Semana</h1>
                </div>
                <div className="btn-container" style={{marginLeft:'30px'}}>
                    <button style={{fontSize:'30px'}} type="button" className="btn" onClick={onClose}>X</button>
                </div>
                </div>
                
                <div className="modal-body">
                    <WeeksForm
                        entity ={weeks}
                        submitted={(weeks) => {addEntityMutation.mutate(weeks);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default WeeksModal;