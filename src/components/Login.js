import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


// import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
// import {navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        //  Validate the form data 
        

        // console.log(email.current.value);
        // console.log(password.current.value);
        // console.log(name.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return ;
        // sign in / sign up Logic 

        if(!isSignInForm) {
            // Sign up Login 
            // const auth = getAuth();

            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
        displayName: name.current.value, photoURL: USER_AVATAR,

      }).then(() => {
        const {uid, email ,
           displayName, photoURL} =
            auth.currentUser;
              dispatch(addUser({uid: uid, email: email, 
                displayName: displayName, 
                photoURL: photoURL}));
        // navigate("/browse")
      }).catch((error) => {
        setErrorMessage(error.message);
      });
    // console.log(user);
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" +errorMessage);
    
  });

        } 
        else  {

            signInWithEmailAndPassword(auth, 
              email.current.value,
               password.current.value
               )
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log(user);
    // navigate("/browse")
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + "-" + errorMessage);
  });

        

        };
};

const toggleSignInForm = () => {
  setIsSignInForm(!isSignInForm);
};    
    return (
        <div>
            <Header />
            <div className="absolute">
            <img className="h-screen w-screen object-cover " 
            src= {BG_URL}
            alt="Background Logo" />
            </div>
            <form onSubmit={(e) =>e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4"> 
                {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>

                {!isSignInForm && (
                <input 
                ref={name}
                type="text" 
                 placeholder="Full Name" 
                 className="p-4 my-4 w-full bg-gray-800" />)}

                <input 
                 ref={email}
                type="text"
                 placeholder="Email Address" 
                 className="p-4 my-4 w-full bg-gray-800" />

                

                <input 
                 ref={password}
                type="password" 
                 placeholder="Password" 
                 className="p-4 my-4 w-full h-full bg-gray-800" />
                 <p className="text-red-800 font-bold text-lg py-3"> {errorMessage}</p>

                <button className="p-4 my-6 bg-red-700 w-full h-full rounded-lg"onClick={handleButtonClick} > 
                {isSignInForm ? "Sign In" : "Sign Up"} 
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                {isSignInForm ? "New to Netflix ? Sign Up Now" : "Already registered? Sign In Now...."}
                    </p>
            </form>
        </div>
    );
};

export default Login;