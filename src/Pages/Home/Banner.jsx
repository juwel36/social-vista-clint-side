import { useEffect, useState } from 'react';
import img from '../../assets/Welcome to Social Vista.png'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
// import useComments from '../../Hooks/useComments';
// 
// 

const Banner = () => {

  // const [comments]=useComments()
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure=useAxiosSecure()

  const handleSearch = async () => {
    try {
      let url;
      if (searchTerm.trim() === '') {
        url = `http://localhost:5000/posts?page=${currentPage}`;
      } else {
        url = `http://localhost:5000/posts?tag=${searchTerm}&page=${currentPage}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);

      const countResponse = await fetch('http://localhost:5000/postscount');
      const countData = await countResponse.json();
      const totalPages = Math.ceil(countData.count / 5); 
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts?page=${currentPage}`);
        const data = await response.json();
        setSearchResults(data);

       
        const countResponse = await fetch('http://localhost:5000/postscount');
        const countData = await countResponse.json();
        const totalPages = Math.ceil(countData.count / 5); 
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [currentPage]);





  

  const { isPending,  data:comments } = useQuery({
    queryKey: ['comments'],
    queryFn:async () =>{
  const res=await axiosSecure.get('/comments')
  return res.data
    }
     
  })
  
  





  
  const getFormattedTime = (timestamp) => {
    const date = new Date(timestamp);
    let hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    return `${hour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;

  }





  return (
    <div>
      <div  className="relative">
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
           
<Link  key={result._id} to={`/details/${result._id}`}>

<div  className="relative flex w-full flex-col rounded-xl h-72  bg-slate-100 p-2  text-gray-700 shadow-md">
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
  <div className="p-0 mb-6 flex-grow ">
    <p className=" text-xl  ">
    Title:  {result.title}
    </p>
  </div>
<div className='flex justify-between font-semibold '>
<h1> Tag: {result.tag} </h1>
<h1>Time: {getFormattedTime(result.timestamp)} </h1>
</div>
<div className='flex justify-between mt-3 font-semibold'>
<h1> 

<h1>
             
                {comments
                  .filter((item) => item.postId === result._id)
                  .length}
                {' '}
                Comments
              </h1>



 
    </h1>
<h1>votes count </h1>
</div>




</div>

</Link>




          ))}
        </div>
        
        {/* Pagination controls */}
        <div className="mt-4 flex justify-center overflow-x-auto">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
