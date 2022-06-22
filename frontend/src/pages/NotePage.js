import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

// const NotePage = ({match}) => {
const NotePage = (props) => {

    // let noteId = match.params.id
    const { id } = useParams()
    const history = useNavigate();
    let [note, setNote] = useState(null)

    useEffect(()=> {
        getNote()
    }, [id])

    let getNote = async ()=> {
        if(id === 'new') return 
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async ()=> {
        fetch(`/api/notes/${id}/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let createNote = async ()=> {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async ()=> {
        fetch(`/api/notes/${id}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        history('/')
    }
    
    let handleSubmit = ()=> {
        if(note !== null) {
            if(id !== 'new' && note.body == '') {
                deleteNote()
            } 
            else if (id !== 'new'){
                updateNote()
            }
            // else if(id == 'new' && note !== null) {
            //     createNote()
            // }
        }
        history('/');
    }

    let handleCreate = ()=> {
        if(note !== null) {
            // get the string
            let myString = note.body;

            // use the \s quantifier to remove all white space
            let remText = myString.replace(/\s/g, "")

            // get the length of the string after removal
            let length = remText.length;

            if(id == 'new' && length != 0) {
                createNote()
            }
        }
        history('/');
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleCreate}>Done</button>
                )}
            </div>
            {/* <textarea onChange={(e)=> { setNote({...note, 'body': e.target.value}) }} defaultValue={note?.body}></textarea> */}
            <textarea onInput={(e)=> { setNote({...note, 'body': e.target.value}) }} defaultValue={note?.body}></textarea>    
        </div>
    )
}

export default NotePage