import { atom } from "jotai";
import Cookies from "js-cookie";

const loginUser = Cookies.get('statusUser')
export const loginAtom = atom (loginUser)

export const userDataAtom = atom(undefined)