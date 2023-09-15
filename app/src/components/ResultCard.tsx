import axios from "axios";
import React, { useState } from "react";
import '../index.css';
//import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export interface ResultCardProps {
    name: string;
    authors: string[];
    abstract: string;
    tags: string[];
    pdfLink: string;
    paperLink: string;
}

export const ResultCard = ({name, authors, abstract, tags, pdfLink, paperLink}: ResultCardProps) => {
    console.log(tags)
    const [newTags, setTags] = useState("");
    const navigate = useNavigate();
    
    //const history = useNavigate();

    const handleNewTags = async (event: React.ChangeEvent<HTMLInputElement>) =>{
        event.preventDefault();
        setTags(event.target.innerHTML);
        console.log("new tags: " , newTags);

    } 
    const handleSendToDatabase = async () => {
        console.log('Button to add to database');
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/papers/', {
                Title: name,
                Authors: authors,
                Abstract: abstract,
                Pdf: pdfLink,
                PaperLink: paperLink, 
                Tags: newTags,
            });
            
            console.log('Paper added to the database');
        } catch (error) {
            console.error(error);
        }
    }

    // const handleCard = async() => {
    //  history.push('/');   
    // }
    const paperId = paperLink.replace("https://arxiv.org/abs/", "") ?? ""
    const handleClick = (paperId: number) => {
       navigate(`/papers/${paperId}`)
   }

    return (
       <div className="Result_Card bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 max-w-3/10 mx-auto mt-10"  style={{maxWidth:"70%"}}>
        <div onClick={()=>handleClick(parseFloat(paperId))} >
           <h4 className="font-bold text-2xl mb-4" id="title">Name: {name}</h4>
           <p className="text-gray-700 text-lg" id="authors">Authors: {authors}</p>
           <p className="text-gray-700 text-base" id="abstract">{abstract}</p>
           {tags && tags.length > 0 && (
            <p className="text-gray-700 text-base" id="tags" onChange={handleNewTags}>
                <i className="fas fa-plus-circle text-gray-500"></i> {tags.join(', ')}
            </p>
            )}
            <p className="text-gray-700 text-base" id="link">Paper Link: {paperLink}</p>
            <p className="text-gray-700 text-base" id="pdfLink">Pdf: {pdfLink}</p>
           
        </div>
         <div className="flex justify-end">
         <button onClick={handleSendToDatabase} className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add to My Bucket</button>
      </div>
      </div>
    )
}  
