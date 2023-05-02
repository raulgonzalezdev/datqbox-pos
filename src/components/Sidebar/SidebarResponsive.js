import React, { useState } from 'react';
import './SidebarResponsive.css';

function SidebarResponsive() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <button className="sidebar__menu-button" onClick={handleMenuButtonClick}>
        <span className="sidebar__menu-button-icon"></span>
      </button>
      <nav className={`sidebar__nav ${isOpen ? 'sidebar__nav--open' : ''}`}>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">Home</a>
          </li>
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">About</a>
          </li>
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">Services</a>
          </li>
          <li className="sidebar__item">
            <a href="#" className="sidebar__link">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SidebarResponsive;
