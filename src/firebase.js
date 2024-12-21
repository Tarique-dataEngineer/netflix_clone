
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
//import { EmailAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyD4SbMFVsZcsiuRo3auHP2ogLPihAH3aSY",
  authDomain: "netflix-clone-c9717.firebaseapp.com",
  projectId: "netflix-clone-c9717",
  storageBucket: "netflix-clone-c9717.firebasestorage.app",
  messagingSenderId: "849175219630",
  appId: "1:849175219630:web:eaa4d07331c450b559cc3f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

};

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

};

const logout = () => {
        signOut(auth);
};

export {auth, db, login, signup, logout};