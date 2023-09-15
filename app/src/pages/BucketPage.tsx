import React, { useState } from "react";
//import { fetchDetails} from "../Utils";
import { ResultCardProps, ResultCard } from "../components/ResultCard";


const BucketPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult]  = useState<ResultCardProps | null>(null);
    const [inputError, setInputError] = useState(false);

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();

        // 
        //const { name, authors, tags, date } = await fetchDetails(searchTerm);
        //setResult({ name, authors, tags, date });
        //console.log(result);
    }
    return (
        <div className="bucket_page">
           <form className="flex flex-row items-center" style={{ maxWidth: '80%', margin: '0 auto' }}>
        <input
          type="text"
          placeholder="find old paper by name, authors or tags"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border-2 p-2 rounded-md"
          style={{ maxWidth: '70%', marginTop: '4vh' }}
        />
        <button type="submit" className="flex items-center justify-end bg-purple-500 text-white p-2 rounded-md ml-2 w-32" style={{ marginTop: '4vh' }} onClick={handleSearch}>
          Search
          <i className="fas fa-search ml-2"></i>
        </button>
      </form>
      <>
        {!result ?
          <label className="block">
            {inputError && <p className="mt-2 text-pink-600 text-sm">Can not find the paper you're looking for</p>}
          </label> :
          <ResultCard name={result.name} authors={result.authors} tags={result.tags} abstract={result.abstract} paperLink={result.paperLink} pdfLink={result.pdfLink} />}
      </>
        </div>
    )
}

export default BucketPage; 