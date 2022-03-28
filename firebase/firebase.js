import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const registerUserWithEmailAndPassword = async (email, password) => {
  const authResult = { user: null, error: null };

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      authResult.user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.code);
      let errorMessage = "Ops! Something went wrong..";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many login tries!";
          break;
        default:
          break;
      }
      authResult.error = errorMessage;
    });

  return authResult;
};

const loginUserWithEmailAndPassword = async (email, password) => {
  const authResult = { user: null, error: null };

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      authResult.user = userCredential.user;
    })
    .catch((error) => {
      console.log(error.code);
      let errorMessage = "Ops! Something went wrong..";
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Wrong email/password!";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found!";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many login tries!";
          break;
        default:
          break;
      }
      authResult.error = errorMessage;
    });

  return authResult;
};

const getUserAuthState = () => {
  const authResult = { unsubscribed: null, isAuthenticated: false };

  authResult.unsubscribed = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user!!! ", user)
      const uid = user.uid;
      authResult.isAuthenticated = true;
    } 
  });

  return authResult;
};

const loginWithGoogle = async () =>{
  try {
    
  } catch (error) {
    throw(error);
  }
}

export {
  auth,
  registerUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
  getUserAuthState,
};

