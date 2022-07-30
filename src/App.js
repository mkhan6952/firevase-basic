import { useEffect, useState } from "react";
import { app, database, storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [e, setE] = useState();

  //to get value from input field
  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  //for Authentication
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  //for add data into database
  const collectionRef = collection(database, "user");
  const collectionRef2 = collection(database, "Doctor");

  //Condition wise query and we have to add this variable in place of collectionRef in handlegetdata function
  const nameQuery = query(
    collectionRef,
    where("email", "==", "iran@gmail.com")
  );

  //for SignUp functionality
  const handleSingup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => console.log(response.user))
      .catch((error) => console.log(error.message));
  };

  //for Login functionality
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => console.log(response.user))
      .catch((error) => console.log(error.message));
  };

  //for LogOut functionality
  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setE(data?.email);
    });
  }, []);

  //for Login with Google
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((response) => console.log(response.user))
      .catch((error) => console.log(error.message));
  };

  //for adding data in user column
  const handleAddData = () => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password,
    })
      .then(() => alert("Data Added"))
      .catch((error) => console.log(error.message));
  };

  //for adding data in Doctor column
  const handleAddData2 = () => {
    addDoc(collectionRef2, {
      email: data.email,
      password: data.password,
    })
      .then(() => alert("Data Added"))
      .catch((error) => console.log(error.message));
  };

  //for reading data in Doctor column
  const handleGetData = () => {
    getDocs(nameQuery)
      .then((response) =>
        console.log(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        )
      )
      .catch((error) => console.log(error.message));
  };

  //for updating data in Doctor column
  const handleUpdateData = () => {
    const docToUpdate = doc(database, "user", "iV37WIUnr7gdvABOMWr2");
    updateDoc(docToUpdate, {
      email: "adeelkhan@gmail.com",
    })
      .then(() => alert("Data Updated"))
      .catch((error) => console.log(error.message));
  };

  //for deleting data in Doctor column
  const handleDeleteData = () => {
    const docToUpdate = doc(database, "user", "648mP1QVaFUA1SJkMkNM");
    deleteDoc(docToUpdate)
      .then(() => alert("Data Deleted"))
      .catch((error) => console.log(error.message));
  };

  //for firebase file storage
  const [file, setFile] = useState({});

  //fonction for add of file in fiebase storage
  const handleFile = () => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div className="App">
      <h5>Currently Logged in as :{e}</h5>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(event) => handleInput(event)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => handleInput(event)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSingup}>
          SingUp
        </button>
        <br></br>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
        <br></br>
        <button type="submit" onClick={handleGoogleLogin}>
          Login With Google
        </button>
        <br></br>
        <button type="submit" onClick={handleAddData}>
          Add Data
        </button>
        <button type="submit" onClick={handleAddData2}>
          Add Data 2
        </button>
        <br />
        <button type="submit" onClick={handleGetData}>
          Get Data
        </button>
        <button type="submit" onClick={handleUpdateData}>
          Update Data
        </button>
        <button type="submit" onClick={handleDeleteData}>
          Delete Data
        </button>
      </div>
      <br></br>
      <h1>Firebase Storage</h1>
      <div>
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </div>
      <button type="submit" onClick={handleFile}>
        Add File
      </button>
    </div>
  );
}

export default App;
