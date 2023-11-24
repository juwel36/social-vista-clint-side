import { useEffect, useState } from 'react';
import img from '../../assets/Welcome to Social Vista.png'

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async () => {
    try {
      let url;
      if (searchTerm.trim() === '') {
        url = 'http://localhost:5000/posts';
      } else {
        url = `http://localhost:5000/posts?tag=${searchTerm}`;
      }



      
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); 





  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70 rounded-lg"></div>
        <img className="h-96 w-full mt-7 rounded-lg" src={img} alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
         
          <div className="flex items-center justify-center max-w-md mx-auto mt-4">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-full border text-black rounded-l focus:outline-none"
            />
            <button className="bg-blue-500 text-white p-2 rounded-r" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {searchResults.map((result) => (
           
<div key={result._id} className="relative flex w-full flex-col rounded-xl  bg-slate-100 p-2  text-gray-700 shadow-none">
  <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-black shadow-none rounded-xl bg-clip-border">
    <img
      src={result.image}
      alt="tania andrew"
      className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
    />
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {result.name}
        </h5>
        <div className="flex items-center gap-0 5">
        


        </div>
      </div>
     
    </div>
  </div>
  <div className="p-0 mb-6">
    <p className="    ">
    Title:  {result.title}
    </p>
  </div>
</div>



          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
