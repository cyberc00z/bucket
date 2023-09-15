import { useParams } from "react-router-dom";
import '../index.css';
import { useEffect, useState } from "react";
import axios from "axios";


const DetailPage = () => {    
    const { paperId } = useParams();
    
    const [paperData, setPaperData] = useState<{pdfLink: string}| null>(null);
    

    //const location = useLocation();
    //console.log("PaperID : ", paperID)
    const paperLink = `https://arxiv.org/abs/${paperId}`;

    useEffect(() => {
        const fetchPaperDetails = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/fetch-paper/', {
                   params: {
                    url: paperLink,
                   } 
                });
                console.log(response.data);
                if (Array.isArray(response.data) && response.data.length >= 4){
                    const pdfLink = response.data[3]
                    setPaperData({ pdfLink })
                } else {
                    console.error('Invalid response format : ', response.data);
                }

            } catch (error){
                console.error("Error fetching paper details: ", error)
            
            }
        }
        fetchPaperDetails();
    },[paperLink])

    if (!paperData){
        return <div>Loading.....</div>
    }
    
   



    return (
        <div className="Detail__Page">
          <p>Detail Page</p>
           {paperData && (
            <div>
                <p>Pdf: {paperData.pdfLink}</p>
            </div>
           )}
           
        </div>
    )
}

export default DetailPage; 