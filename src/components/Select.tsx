
type Props<T>={
    data: T[] | undefined; 
  value: T[keyof T] | ""; 
  optionLabel: (keyof T)[]; 
  getId:(item:T)=>number;
  onChange: (value:number ) => void; 
};



const Select=<T,>(props: Props<T>)=>{
    return (
        <div>
            {props.data? 
                <select 
                style={{marginTop:'6px'}}
                className="form-control" value={props.value as string | number} 
               //onChange={(e) => props.onChange(e.target.value as string |number | null)}
               onChange={(e) => {
                const selectedValue = e.target.value;
                if (typeof selectedValue === 'string') {
                    // Assuming selectedValue is convertible to a number
                    props.onChange(parseInt(selectedValue, 10));
                } else if (typeof selectedValue === 'number') {
                    props.onChange(selectedValue);
                }
            }}
            
                >
        <option value="">Seleccionar una opción...</option>
        {props.data.map((item) => (
          <option key={props.getId(item)} value={props.getId(item)}>
            {
           // String(item[props.optionLabel]) 
       
           props.optionLabel && props.optionLabel.map((label) => String(item[label])).join(' ')
           
           }
            
          </option>
        ))}
      </select>
            :
            <p>Loading options...</p> // Show loading indicator while data is being fetched 
           }
        
        </div>
       
    );
}



export default Select;