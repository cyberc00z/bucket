import axios from "axios";
import React from "react";

export interface ResultCardProps {
    name: string;
    authors: string[];
    abstract: string;
    tags: string[];
    pdfLink: string;
}

export const ResultCard = ({name, authors, abstract, tags, pdfLink}: ResultCardProps) => {

    const handleSendToDatabase = async () => {

        console.log('Button to add to database');
        const formData = {
            name:name,
            authors: authors,
            tags: tags,
            abstract: abstract,
            pdfLink: pdfLink 
        }
        console.log(formData)
        try {
        const req = await axios.post('http://127.0.0.1:8000/api/add-paper/', formData)
        .then((res) => {
            const message =  res.data
            console.log(message)
        })
    }catch(error){
        console.error(error)
    }
    }


    return (
        <div className="Result_Card bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-6/10 mx-auto mt-10" style={{ maxWidth: '70%'}}>
        <h4 className="font-bold text-2xl mb-4">Name: {name}</h4>
        <p className="text-gray-700 text-lg">Authors: {authors.join(', ')}</p>   
        <p className="text-gray-700 text-base">{abstract}</p>
        <p className="text-gray-700 text-base"contentEditable="true"><i className="fas fa-plus-circle text-gray-500"></i> #{tags.join(', ')}</p>
        <p className="text-gray-700 text-base">Pdf : {pdfLink}</p>
        <div className="flex justify-end">
            <button onClick={handleSendToDatabase} className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add to My Bucket</button>
        </div>
       </div>    
    )
}  
