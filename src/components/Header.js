import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { Logo, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import lang from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {

  const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
   const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
    const handleSignOut = () => {
        signOut(auth).then(() => {
          }).catch((error) => {
            navigate("/error");
          });
    };


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
             
            const {uid, email , displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, 
              displayName: displayName, photoURL: photoURL}));
            navigate("/browse");
          } else {
            dispatch(removeUser()); 
            navigate("/");
            
          }
        });
        return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());

  }

  const handleLanguageChange = (e) => {
     dispatch(changeLanguage(e.target.value));
  };
    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row  justify-between">
            <img 
            className="w-44 mx-auto md:mx-0"
            src={Logo}
            alt="Logo"/>
             
            <div className="flex p-2 justify-between">
              {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value ={lang.identifier}> {lang.name} </option>
                 )}
                
                 
              </select>)}
              <button className="py-2 px-4 bg-purple-800 text-white mx-4 my-2 rounded-lg"
              onClick={handleGptSearchClick}
              > {showGptSearch? "Homepage": " GPT Search"}</button>
              <img  className = " hidden md:block w-11 h-12"
               alt="usericon"
              src= 
              "https://avatars.githubusercontent.com/u/99180742?v=4" 
              />   
              <button onClick={handleSignOut} className="font-bold text-white"> (Sign Out) </button>
            </div>
            
        
        </div>
    );
};

export default Header;