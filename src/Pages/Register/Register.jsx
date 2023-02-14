import { atom, useAtom } from "jotai";
import { useState } from "react";
import FormRegister from "../../Components/Register/FormRegister";

export const userDataAtom = atom({
    username: "",
    email: "",
    password: "",
  });

const Register = () => {
    const [data, setData] = useAtom(userDataAtom);

    return (
        <>
        <FormRegister data={data} setData={setData}/>
        </>
    )
}

export default Register;