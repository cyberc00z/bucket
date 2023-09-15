import React, { useState } from "react";
import { ResultCard, ResultCardProps } from "../components/ResultCard";
//import { fetchDetails } from '../Utils';
import axios from "axios";

const AddPage = () => {
  const [addlink, setAddLink] = useState('');
  const [result, setResult] = useState<ResultCardProps | null>(null);
  const [inputError, setInputError] = useState(false);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // // Validate the input value
    if (!isValidUrl(addlink)) {
      setInputError(true);
      return;
    }

    setInputError(false);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/fetch-paper/', {
        params: {
          url: addlink,
        }
      });
      console.log(typeof(response.data))
      if (response.data.Title && response.data.Authors && response.data.Abstract && response.data.Pdf){
      const {Title, Authors, Abstract, Pdf} = response.data;
      const tags = ['']
      setResult({name:Title,authors:Authors, abstract:Abstract,tags,pdfLink:Pdf, paperLink: addlink});
      } else if (Array.isArray(response.data) && response.data.length >= 4) {
        const name = response.data[0]
        const authors = response.data[1]
        const abstract = response.data[2]
        const tags = ['']
        const pdfLink = response.data[3]
        setResult({name, authors, abstract, tags,pdfLink, paperLink:addlink})
      } else {
        console.error('Invalid response format : ', response.data);
      }
    }
    catch(error){
      console.error(error)
      setInputError(true);
      
    }
  }

  const isValidUrl = (url: string) => {
    // Regular expression pattern for URL validation
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    return urlPattern.test(url);
  }
  

  return (
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
            {inputError && <p className="mt-2 text-pink-600 text-sm">Please provide a valid URL</p>}
          </label> :
          <ResultCard name={result.name} authors={result.authors} abstract={result.abstract} tags={result.tags} paperLink={addlink} pdfLink={result.pdfLink} />
          
          }
          
      </>
    </div>
  )
}

export default AddPage;