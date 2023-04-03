import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../FirebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("")
  const [docsData, setDocsData] = useState([])

  let userEmail = localStorage.getItem('userEmail')
  let userName = localStorage.getItem('name')
  let databaseCollection = collection(database, `${userEmail}docs-data`);
  let navigate = useNavigate();
  let auth = getAuth();

  // logging out the user
  const logoutUser = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

//checking if the user logged in or not if logged in then navigating to home page if not remain on same page
  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  // adding the data to firestore database
    const addDocument = () => {
      addDoc(databaseCollection, {
        title: title,
        author: userEmail,
        body: ''
      })
      .then(response => {
        alert("Data added")
        setIsAdd(false)
        setTitle('')
      })
      .catch(()=>{
        alert("Cannot add data")
      })
    }

    // navigating document wise page
    const openEditor = (id) => {
        // console.log(id)

        navigate(`/editor/${id}`)
    }

    //getting the realtime data from firestore
    useEffect(()=>{
        onSnapshot(databaseCollection, (response)=>{
            setDocsData(response.docs.map((doc)=>{
                return {...doc.data(), id: doc.id}
            }))
        })
    },[])

  return (
    <div className="text-center text-[#0B2447]"> 
      <h1 className="text-2xl font-semibold">Home</h1>
        <h2 className="mt-2 text-lg font-semibold lg:text-5xl lg:mt-5 lg:mb-2 ">Welcome, {userName}</h2>
      <div className="">
        <button onClick={logoutUser} className='text-[#A5D7E8] bg-[#0B2447] mt-2 px-5 py-1 rounded lg:text-2xl lg:mt-5'>
          Logout
        </button>
      </div>
      <button className="mt-2 text-[#A5D7E8] bg-[#0B2447] px-5 py-1 rounded-full lg:text-2xl lg:mt-5" onClick={() => setIsAdd(!isAdd)}>
        Add Document
      </button>
      {isAdd ? (
        <div className="mt-5 ">
          <input type="text" placeholder="Add Doc Title" className="border-b border-[#0b2447] outline-none text-center mr-2" onChange={(e)=> setTitle(e.target.value)} value={title}/>
          <button className="text-[#A5D7E8] bg-[#0B2447] px-3 rounded-full py-1 lg:text-xl" onClick={addDocument}>Add</button>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 lg:gap-5">
        {docsData.map((doc)=>{
            return(
                <div className=" mt-2 border-2 border-[#0b2447] hover:bg-[#0b2447] hover:text-[#a5d7e8] lg:px-5 lg:text-2xl" key={doc.id} onClick={()=> openEditor(doc.id)}>
                    <h3>{doc.title}</h3>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Home;
