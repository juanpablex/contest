
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default (_props: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu=()=>{
   
   setMenuOpen(false);
  }

  return (
    <Menu isOpen={menuOpen} onStateChange={(state:any)=>setMenuOpen(state.isOpen)}>
      {/* <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/personTypes">
        Tipo de personas
      </a>
      <a className="menu-item" href="/people">
        Personas
      </a>
      <a className="menu-item" href="/contracts">
        Contratos
      </a>
      <a className="menu-item" href="/products">
        Productos
      </a>
      <a className="menu-item" href="/brands">
        Marcas
      </a>
      <a className="menu-item" href="/models">
        Modelos
      </a>
      <a className="menu-item" href="/colors">
        Colores
      </a>
      <a className="menu-item" href="/paymentMethods">
        Métodos de Pago
      </a>
      <a className="menu-item" href="/states">
        Estados
      </a>
      <a className="menu-item" href="/ranges">
        Rangos
      </a> */}
      <Link to="/" className="menu-item"  onClick={closeMenu}>
        Home
      </Link>
      <Link to="/scores" className="menu-item" onClick={closeMenu}>
        Puntajes
      </Link>
      <Link to="/imitations" className="menu-item" onClick={closeMenu}>
        Imitaciones
      </Link>
      <Link to="/participants" className="menu-item" onClick={closeMenu}>
        Participantes
      </Link>
      <Link to="/juries" className="menu-item" onClick={closeMenu}>
        Jurados
      </Link>
      <Link to="/galas" className="menu-item" onClick={closeMenu}>
        Galas
      </Link>
      <Link to="/galaTypes" className="menu-item" onClick={closeMenu}>
        Tipos de Galas
      </Link>
      <Link to="/states" className="menu-item" onClick={closeMenu}>
        Estados
      </Link>
    
    </Menu>
  );
};