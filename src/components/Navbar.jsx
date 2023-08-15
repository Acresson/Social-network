import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { jwtAtom } from '../atoms/atom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [jwtData, setJwtData] = useAtom(jwtAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setJwtData({ register: null, login: null });
    Cookies.remove('jwt-login');
    navigate('/login');
  };

  return (
    <div>
      {jwtData.login && (
        <div>
          <Link to="/homepage">Home</Link>
          <Link to="/profil">Profil</Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      )}
  
      {!jwtData.login && (
        <div>
          <Link to="/">Inscription</Link>
          <Link to="/login">Connexion</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;