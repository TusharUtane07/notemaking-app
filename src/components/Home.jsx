import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Home = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);

  let userEmail = localStorage.getItem("userEmail");
  let userName = localStorage.getItem("name");
  let databaseCollection = collection(database, `${userEmail}docs-data`);
  let navigate = useNavigate();
  let auth = getAuth();

  // logging out the user
  const logoutUser = () => {
    signOut(auth).then(() => {
      navigate("/");
      toast.success("Logout Successfully!!", {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
      body: "",
    })
      .then((response) => {
        toast.success("Document Added", {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsAdd(false);
        setTitle("");
      })
      .catch(() => {
        toast.error("Cannot add data");
      });
  };

  // navigating document wise page
  const openEditor = (id) => {
    // console.log(id)

    navigate(`/editor/${id}`);
  };

  //getting the realtime data from firestore
  useEffect(() => {
    onSnapshot(databaseCollection, (response) => {
      setDocsData(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const deleteDocument = (id) => {
    deleteDoc(doc(database, `${userEmail}docs-data`, id)).then(() => {
      toast.success("Document Deleted", {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
    setTitle("");
  };

  return (
    <div className="text-center text-[#0B2447]">
      <h1 className="text-2xl font-semibold">Home</h1>
      <h2 className="mt-2 text-lg font-semibold lg:text-5xl lg:mt-5 lg:mb-2 ">
        Welcome, {userName}
      </h2>
      <div className="">
        <button
          onClick={logoutUser}
          className="text-[#A5D7E8] bg-[#0B2447] mt-2 px-5 py-1 rounded lg:text-2xl lg:mt-5"
        >
          Logout
        </button>
      </div>
      <button
        className="mt-2 text-[#A5D7E8] bg-[#0B2447] px-5 py-1 rounded-full lg:text-2xl lg:mt-5"
        onClick={() => setIsAdd(!isAdd)}
      >
        Add Document
      </button>
      {isAdd ? (
        <div className="mt-5 ">
          <input
            type="text"
            placeholder="Add Doc Title"
            className="border-b border-[#0b2447] outline-none text-center mr-2"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button
            className="text-[#A5D7E8] bg-[#0B2447] px-3 rounded-full py-1 lg:text-xl"
            onClick={addDocument}
          >
            Add
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="mt-5 grid grid-cols-1 justify-center  items-center  p-6">
        {docsData.map((doc, index) => {
          return (
            <div className="flex items-center justify-center" key={doc.id}>
              <div
                className=" hover:bg-[#0b2447] hover:text-[#a5d7e8] lg:px-5 lg:text-2xl flex items-center cursor-pointer"
                onClick={() => openEditor(doc.id)}
              >
                <h3>
                  {++index}. {doc?.title}
                </h3>
              </div>
              <div className="h-8 ml-2 cursor-pointer flex items-center justify-center">
                <MdDeleteOutline
                  onClick={() => deleteDocument(doc.id)}
                  className="text-xl hover:text-red-700"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
