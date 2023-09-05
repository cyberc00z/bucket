import React from "react";

export interface ResultCardProps {
    name: String;
    authors: String[];
    date: Date;
    tags: String[];
}

export const ResultCard = ({name, authors, date, tags}: ResultCardProps) => {
    return (
        <div className="Result_Card bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-6/10 mx-auto mt-10" style={{ maxWidth: '70%'}}>
            <h2 className="font-bold text-xl mb-2">Name: {name}</h2>
            <p className="text-gray-700 text-base">Authors: {authors.join(', ')}</p>
            <p className="text-gray-700 text-base">Date: {date.toLocaleDateString()}</p>  
            <p className="text-gray-700 text-base">Tags: {tags.join(', ')}</p>
        </div>    
    )
}  

