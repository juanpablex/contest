import React, { useState } from "react";
import { Weeks } from "../../types/weeks";
import { formatDate } from "../../config";

type Args = {
    entity: Weeks;
    submitted: (entity: Weeks) => void;
    parent: string | null

};

const WeeksForm = ({ entity, submitted, parent }: Args) => {
    const [concrete, setConcrete] = useState({ ...entity });
    const [selectedDateIni, setSelectedDateIni] = useState<string>('');
    const [selectedDateEnd, setSelectedDateEnd] = useState<string>('');
    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        submitted(concrete);
    };



    return (
        <form className="mt-2">
            <div className="form-group mt-2">
                <label htmlFor="country">Fecha Inicial</label>
                {concrete != null ?
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Fecha Inicial"
                        value={concrete.dateIni.toString()}
                        onChange={(e) => {
                            setConcrete({ ...concrete, dateIni: new Date(e.target.value) });
                            setSelectedDateIni(e.target.value);
                        }}
                    />
                    :
                    null}
                <p>Seleccion: {selectedDateIni?formatDate(selectedDateIni):''}</p>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="country">Fecha Final</label>
                {concrete != null ?
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Fecha Final"
                        value={concrete.dateEnd.toString()}
                        onChange={(e) =>{
                            setConcrete({ ...concrete, dateEnd: new Date(e.target.value) });
                            setSelectedDateEnd(e.target.value);
                        }}
                    />
                    :
                    null}
                <p>Seleccion: {selectedDateEnd?formatDate(selectedDateEnd):''}</p>
            </div>


            <button
                className="btn btn-primary mt-2"
                disabled={!concrete.dateIni && !concrete.dateEnd}
                onClick={onSubmit}
            >
                Guardar
            </button>



        </form>
    );
};

export default WeeksForm;
