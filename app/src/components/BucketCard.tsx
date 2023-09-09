import React from 'react'
import { ResultCardProps } from './ResultCard'

const BucketCard = ({name, authors, tags, abstract, pdfLink}: ResultCardProps) => {
    return (
        <div className="Result_Card bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-6/10 mx-auto mt-10" style={{ maxWidth: '70%'}}>
        <h4 className="font-bold text-xl mb-2">Title: {name}</h4>
        <p className="text-gray-700 text-base">Authors: {authors}</p>
        <p className="text-gray-700 text-base">Tags: {tags}</p>
        <p className="text-gray-700 text-base">Abstract: {abstract}</p> 
        <p className='text-gray-700 text-base'>Pdf : {pdfLink}</p>
    </div>    
    )
}

export default BucketCard