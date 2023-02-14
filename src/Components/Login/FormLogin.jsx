import Cookies from "js-cookie";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataAtom } from "../Atom/LoginAtom";


const FormLogin = () => {
  const [userData, setUserData] = useAtom(userDataAtom)
  const navigate = useNavigate();

  const [dataUserLogin, setDataUserLogin] = useState({
    identifier: "",
    password: "",
  })

  const handleChangeLogin = (event) => {
    setDataUserLogin({
      ...dataUserLogin,
      [event.target.name]: event.target.value
    });
  };

    const handleLogin = (e) => {
        e.preventDefault();
    
        fetch('http://localhost:1337/auth/local', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataUserLogin)
        })
        .then(response => response.json())
        .then(result => {
          if (result.statusCode === 400){
            alert("Erreur mauvais identifiant")
            setDataUserLogin({ identifier: "", password: "" });
          } else {
            const {jwt} = result;
            Cookies.set('token', jwt);
            Cookies.set('statusUser', 'isLogin');
            setUserData(result.user)
            navigate("/")
          }
        });
    };
    
    return (
      <form onSubmit={handleLogin}>
          <div className="container-form-register">
              <div className="card-form-register">
                  <div className="form-register">
                  <div className="mb-3">
                  <label for="identifier">Nom d'utilisateur :</label>
                        <input className="form-control" type="text" id="identifier" name="identifier" value={dataUserLogin.identifier} onChange={handleChangeLogin} />
                  </div>
                      <div className="mb-3">
                          <label for="password">Mot de passe :</label>
                          <input className="form-control" type="password" id="password" name="password" value={dataUserLogin.password} onChange={handleChangeLogin} />
                      </div>
                      <div className="mb-3 button-register">
                          <input type="submit" className="btn btn-primary" value="Se connecter"/>
                      </div>
                  </div>
              </div>
          </div>
      </form>
  )
}

export default FormLogin; 