import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userDataAtom } from "../Atom/LoginAtom";


const FormRegister = ({data, setData}) => {
    const [userData, setUserData] = useAtom(userDataAtom)
    const navigate = useNavigate();

    const handleChangeRegister = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:1337/auth/local/register', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(result => {
            const {jwt} = result;
            setUserData(result.user)
            Cookies.set('token', jwt);
            navigate("/login")
          });
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="container-form-register">
                <div className="card-form-register">
                    <div className="form-register">
                    <div className="mb-3">
                        <label for="username">Nom d'utilisateur :</label>
                        <input className="form-control" type="text" id="username" name="username" value={data.username} onChange={handleChangeRegister} />
                    </div>
                        <div className="mb-3">
                            <label for="email">Adresse e-mail :</label>
                            <input className="form-control" type="email" id="email" name="email" value={data.email} onChange={handleChangeRegister} />
                        </div>
                        <div className="mb-4">
                            <label for="password">Mot de passe :</label>
                            <input className="form-control" type="password" id="password" name="password" value={data.password} onChange={handleChangeRegister} />
                        </div>
                        <div className="mb-3 button-register">
                            <input type="submit" className="btn btn-primary" value="Envoyer"/>
                            <Link className="btn btn-primary" to="/login">J'ai déjà un compte</Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        </>
    )
};

export default FormRegister;