import { useEffect, useState } from 'react';
import img from '../../assets/Welcome to Social Vista.png'
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { FaComments } from 'react-icons/fa';
import { SlDislike, SlLike } from 'react-icons/sl';
import Suggestedtag from '../../Components/Suggestedtag';
import Spinner from '../../Components/Spinner';
import { FcNext, FcPrevious } from "react-icons/fc";


const Banner = () => {


  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure()

  const handleSearch = async () => {

    setCurrentPage(1);

    let url;
    if (searchTerm.trim() === '') {
      url = `https://social-vista-server-side.vercel.app/posts?page=${currentPage}`;
    } else {
      url = `https://social-vista-server-side.vercel.app/posts?tag=${searchTerm}&page=1`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(data);


    const totalSearchResults = data.length;

    setTotalPages(Math.ceil(totalSearchResults / 5));

  };


  useEffect(() => {
    const fetchData = async () => {

      const url = searchTerm.trim() === ''
        ? `https://social-vista-server-side.vercel.app/posts?page=${currentPage}`
        : `https://social-vista-server-side.vercel.app/posts?tag=${searchTerm}&page=${currentPage}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);

      const countResponse = await fetch('https://social-vista-server-side.vercel.app/postscount');
      const countData = await countResponse.json();
      const totalPosts = searchTerm.trim() === '' ? countData.count : data.length;
      const totalPages = Math.ceil(totalPosts / 5);
      setTotalPages(totalPages);

    };

    fetchData();
  }, [currentPage, searchTerm]);








  const { isPending, data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/comments')
      return res.data
    }

  })



  if (isPending) return <Spinner></Spinner>


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  const getPageRange = () => {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

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
      <div className="relative ">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70 rounded-lg"></div>

        <img className="h-96 w-full mt-7 rounded-lg" src={img} alt="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className='text-4xl p-3 font-bold shadow-2xl'> Elevate Your Social Experience <br /> <span className='text-2xl '> 🎭 Dive into Social Vista 🤾‍♂
          </span> </h1>
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

        <div>

          <Suggestedtag></Suggestedtag>
        </div>

        <div className="text-center mt-40 my-10 w-full mx-auto ">
          <p className="text-black text-3xl border-y-2  py-2 mt-2"> All Post </p>



        </div>


        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

          {searchResults?.map((result) => (

            <Link key={result._id} to={`/details/${result._id}`}>

              <div className="relative flex w-full flex-col rounded-xl h-72  bg-slate-100 p-2  text-gray-700 shadow-md">
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
                <div className="p-0 mb-6 ">
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

                    <h1 className='flex items-center gap-2'>
                      <FaComments />

                      {comments?.filter((item) => item.postId === result._id)
                        .length}
                      {' '}
                    </h1>
                  </h1>
                  <div>

                    <div className="flex gap-5">
                      <div className="flex gap-1 items-center">
                        <SlLike />
                        {result.upvote}
                      </div>
                      <div className="flex gap-1 items-center">
                        <SlDislike />
                        {result.downvote}
                      </div>
                    </div>
                  </div>
                </div>




              </div>

            </Link>




          ))}
        </div>


        {/* Pagination controls */}
        <div className="mt-4 flex justify-center overflow-x-auto">
          <button
            className={`mx-2 px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-gray-700' : 'bg-blue-200 text-white'
              }`}
            onClick={handlePreviousPage}
          >
            <FcPrevious />
          </button>
          {getPageRange().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-2 px-4 py-2 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={`mx-2 px-4 py-2 rounded ${currentPage === totalPages ? 'border-2' : 'border-2'
              }`}
            onClick={handleNextPage}
          >
            <FcNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
