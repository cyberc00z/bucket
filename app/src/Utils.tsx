const fetchDetails =  async (addlink: string) => {
    const response = await fetch(addlink);
    const data = await response.json();
    
    const { name, authors, tags, date } = data; 

    return {name, authors, tags, date}

}

export default fetchDetails;