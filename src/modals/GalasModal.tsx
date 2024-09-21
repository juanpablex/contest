import {FC, ReactElement} from 'react';
import   './Modal.css';
import { useAddEntity } from '../hooks/useEntityManager';
import { Galas } from '../types/galas';
import GalasForm from '../Views/Galas/GalasForm';
interface ModalProps{
    open: boolean;
    onClose:()=>void;
    children:ReactElement;
    parent: string| null,
}



const GalasModal: FC<ModalProps> = ({ open, onClose , parent}): JSX.Element => {
    const addEntityMutation = useAddEntity<Galas>({
        endpoint: '/api/Galas',
        navTo: '/galas'});

    const galas: Galas = {
        id: 0,
        day: "",
        date:new Date(),
        quantity:0,
        nominated:0,
        totalNominated:0,
        idType:0,
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
                    <GalasForm
                        entity ={galas}
                        submitted={(galas) => {addEntityMutation.mutate(galas);onClose()}}            
                        parent ={parent}       />
                </div>
            </div>
        </div>
    );
};

export default GalasModal;