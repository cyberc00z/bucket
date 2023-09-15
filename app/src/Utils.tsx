import axios from "axios";

export const fetchDetails = async (addLink:String) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/papers/', { link: addLink });
      console.log(response);
      const { title, authors, tags, date } = response.data;
      console.log(title, authors, tags, date);
      return { title, authors, tags, date };

    } catch(error){
        console.error(error);
        //return error
    }
}
//export const card = './public/icon.png';
