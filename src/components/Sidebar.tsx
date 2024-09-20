
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
      <Link to="/personTypes" className="menu-item" onClick={closeMenu}>
        Tipo de personas
      </Link>
      <Link to="/people" className="menu-item" onClick={closeMenu}>
        Personas
      </Link>
      <Link to="/contracts" className="menu-item" onClick={closeMenu}>
        Contratos
      </Link>
      <Link to="/products" className="menu-item" onClick={closeMenu}>
        Productos
      </Link>
      <Link to="/brands" className="menu-item" onClick={closeMenu}>
        Marcas
      </Link>
      <Link to="/participants" className="menu-item" onClick={closeMenu}>
        Participantes
      </Link>
      <Link to="/juries" className="menu-item" onClick={closeMenu}>
        Jurados
      </Link>
      <Link to="/galaTypes" className="menu-item" onClick={closeMenu}>
        Tipos de Galas
      </Link>
      <Link to="/states" className="menu-item" onClick={closeMenu}>
        Estados
      </Link>
      <Link to="/ranges" className="menu-item" onClick={closeMenu}>
        Rangos
      </Link>
    </Menu>
  );
};