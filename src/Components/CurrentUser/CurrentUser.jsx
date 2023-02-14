import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userDataAtom } from "../Atom/LoginAtom";

const CurrentUser = () => {
    const [userData, setUserData] = useAtom(userDataAtom)
    const token = Cookies.get('token');

    const handleChangeProfil = (event) => {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value
      })
    }

    useEffect(() => {
        fetch("http://localhost:1337/users/me", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => {
            setUserData(result);
          });
      }, [token]);
      
      const handleSubmitModify = (event) => {
        event.preventDefault();
      
        fetch(`http://localhost:1337/users/${userData.id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(result => {
          alert("Profil à jour")
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du profil :', error);
          alert('Une erreur est survenue lors de la mise à jour du profil.');
        });
      };

    return (
        <>
        { userData ? (
             <>
                <h3>Bienvenu sur votre profil {userData.username}</h3>
                <p>Votre addresse mail : {userData.email}</p>

                <form onSubmit={handleSubmitModify}>
                  <div className="container-form-profil">
                      <div className="card-form-register">
                          <div className="form-register">
                          <div className="mb-3">
                              <label htmlFor="username">Nom d'utilisateur :</label>
                              <input className="form-control" type="text" id="username" name="username" value={userData.username} onChange={handleChangeProfil} />
                          </div>
                              <div className="mb-3">
                                  <label htmlFor="email">Adresse e-mail :</label>
                                  <input className="form-control" type="email" id="email" name="email" value={userData.email} onChange={handleChangeProfil} />
                              </div>
                              <div className="mb-4">
                                  <label htmlFor="password">Mot de passe :</label>
                                  <input className="form-control" type="password" id="password" name="password" value={userData.password} onChange={handleChangeProfil} />
                              </div>
                              <div className="mb-3 button-register">
                                  <input type="submit" className="btn btn-primary" value="Modifier"/>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
             </>
        ) : (
            <p>Chargement de vos informations en cours...</p>
        )}
       
        </>
    )
}

export default CurrentUser;