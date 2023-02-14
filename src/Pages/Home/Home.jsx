import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userDataAtom } from "../../Components/Atom/LoginAtom";
import Posts from "../../Components/Posts/ShowPost";
import CreatePosts from "../../Components/Posts/CreataPosts";



const Home = () => {
    const [userData, setUserData] = useAtom(userDataAtom)

    const statusUser = Cookies.get('statusUser')
    
    return (
        <>
        {statusUser === "isLogin" ? (
            <>
            <h3>Bonjour {userData?.username}</h3>
                <CreatePosts/>
                <Posts/>
            </>
        ) : (
            <h3 className="mt-4">Welcome on My Social Network. This website is a training to React, global state handling and tokens.<br/> Here, authentification and routing will be used to create a small social media website.</h3>
        )}
        </>
    );
};

export default Home;