import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { database } from '../FirebaseConfig';


const EditorPage = () => {

    let navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [editorData, setEditorData] = useState('')
    let userEmail = localStorage.getItem('userEmail')
    let databaseCollection = collection(database, `${userEmail}docs-data`);
    const param = useParams();
    const getEditorData = (value) => {
        setEditorData(value)
    }

    useEffect(()=>{
        const updateDocument = setTimeout(() => {
            let docToUpdate = doc(databaseCollection, param.id)

            updateDoc(docToUpdate, {
                body: editorData
            })
            .then(()=>{
                // alert("Data updated")
            })
            .catch((error)=>{
                // alert("Error Occured!!", error)
            })
        }, 2000);

        return () => clearTimeout(updateDocument)

    },[editorData])

    useEffect(()=>{

        const document = doc(databaseCollection, param.id)
        onSnapshot(document, (doc)=>{
            setTitle(doc.data().title)
            setEditorData(doc.data().body)
        })
    },[])

  return (
    <div className=''>
        <h3 className='text-[#0B2447] text-2xl text-center mb-2'>{title}</h3>
        <div className='border-4 border-[#0B2447] w-72 h-72 md:w-[40rem] lg:w-[60rem] xl:w-[80rem] xl:h-[25rem] lg:h-[25rem] overflow-scroll'> 
       <ReactQuill value={editorData} onChange={getEditorData}/>
        </div>
       <button onClick={()=> navigate('/')} className=' text-[#0B2447] border-b border-[#0B2447] px-5 py-1 absolute bottom-5 left-3.5 md:left-[42%] lg:left-[45%] text-center'>Go Back</button>
    </div>
  )
}

export default EditorPage