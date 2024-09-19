import React from 'react';
import { Link } from 'react-router-dom';

const ActionButtons = ({ entity, onDelete, editPath }) => {
  return (
    <div>
        <div className="row">
            <h3 className="col-12">{entity.name}</h3>
            </div>
        <div className="row mt-3">
        <div className="col-4">
            <Link
            className="btn btn-primary"
            style={{ width: 'auto' }}
            to={editPath}
            >
            Editar
            </Link>
        </div>
        <div className="col-2">
            <button
            className="btn btn-danger"
            style={{ width: 'auto' }}
            onClick={() => {
                if (window.confirm('¿Estás seguro?')) onDelete(entity);
            }}
            >
            Borrar
            </button>
        </div>
        </div>
    </div>
   
  );
};

export default ActionButtons;
