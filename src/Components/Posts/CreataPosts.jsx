import { atom, useAtom } from "jotai";
import Cookies from "js-cookie";
import { useState } from "react";


const CreatePosts = () => {

    const [formData, setFormData] = useState({
            user: 40,
            texte: "",
        });

    const token = Cookies.get('token');


    const handleCreatePost = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        })
      }

    const handleSubmitCreatePosts = (event) => {
        event.preventDefault();
        console.log(formData); 

        fetch('http://localhost:1337/posts', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({data: formData})
          })
          .then((response) => response.json())
          .catch((error) => {
            console.error("Error:", error);
          });
    };


    return (
        <>
        <form onSubmit={handleSubmitCreatePosts}>
            <div className="container-form-create-post">
                <div className="card-form-register">
                    <div className="form-register">
                    <div className="mb-3">
                        <label htmlFor="username">Créer un poste :</label>
                        <input className="form-control" type="text" id="texte" name="texte" value={formData.texte} onChange={handleCreatePost} />
                    </div>
                    <div className="mb-3 button-register">
                        <input type="submit" className="btn btn-primary" value="Créer un poste"/>
                    </div>
                    </div>
                </div>
            </div>
        </form>
        <div className="container-post">
            <p className="text-posts">{formData.texte}</p>
        </div>
        </>
    )
}

export default CreatePosts;