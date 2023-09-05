import React, { useState } from "react";
import {ResultCard, ResultCardProps} from "./ResultCard";
//import fetchDetails from '../Utils';


const AddPage = () => {
   const [addlink, setAddLink] = useState('');
   const [result, setResult]  = useState<ResultCardProps | null>(null);
   


   const handleSubmit = (event: React.FormEvent) => {
       event.preventDefault();
       // Assuming fetchDetails is a function that fetches the details from the link
       // This function needs to be defined
       //const { name, authors, tags, date } = fetchDetails(addlink);
       // Assuming ResultCard is a component that takes name, authors, tags, date as props
       // This component needs to be imported
       const name = 'Lithographic Gradient'
       const authors = ['Yang Change', 'Paris Wilson', 'Ali Yus', 'Hotz Yud']
       const tags = ['phyics', 'materials', 'physicalchemistry']
       const date = new Date();

       setResult({name,authors,tags,date});
       console.log(result);
   }



   return(
    <div>
        <form className="flex flex-row items-center" style={{ maxWidth: '80%', margin: '0 auto' }}>
          <input 
            type="url" 
            pattern="https?://.+\.edu/.+|https?://arxiv.org/.+|https?://.+\.ac\.uk/.+|https?://.+\.edu\.au/.+|https?://.+\.gov/.+|https?://.+\.arxiv\.org/.+|https?://.+\.biorxiv\.org/.+" 
            placeholder="Enter research paper link" 
            value={addlink} 
            onChange={(e) => setAddLink(e.target.value)}
            className="flex-grow border-2 p-2 rounded-md"
            style={{ maxWidth: '70%', marginTop: '4vh' }}
          />
          <button type="submit" className="flex items-center justify-end bg-black text-white p-2 rounded-md ml-2 w-32" style={{ marginTop: '4vh' }} onClick={handleSubmit}>
            Add 

            <i className="fas fa-plus ml-2"></i>
          </button>
        </form>
        <>
        {!result ? 
        <label className="block">
          <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
            Please Provide the correct link 
          </p>
        </label> :
        <ResultCard name={result.name} authors={result.authors} tags={result.tags} date={result.date} />}
      </>
    </div>
   )
}

export default AddPage;