import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useAtom } from "jotai"; 
import {loginAtom} from "../Atom/LoginAtom"
import { userDataAtom } from "../Atom/LoginAtom";

const Navbar = () => {
  const [userData, setUserData] = useAtom(userDataAtom)
  const [userLogin, setUserLogin] = useAtom(loginAtom);

  const handleDelete = () => {
    Cookies.remove('token');
    Cookies.remove('statusUser');
  }

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">SocialNetwork</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link className="nav-link active" to="/">Page d'accueil</Link>
              </li>
              { userLogin === "isLogin" ? (
                <>
                 <li className="nav-item dropdown">
                 <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Mon profil {userData?.username}
                 </a>
                 <ul className="dropdown-menu">
                   <li><Link className="dropdown-item" to="/profil">Accèder a mon profil</Link></li>
                   <li><a className="dropdown-item" onClick={handleDelete} href="#">Se déconnecter</a></li>
                 </ul>
               </li>
               </>
              ) : (
                <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">S'incrire</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Se connecter</Link>
                </li>
                </>
              )}
            </ul>
          </div>
        </div>
        </nav>
        </>
    )
};

export default Navbar; 