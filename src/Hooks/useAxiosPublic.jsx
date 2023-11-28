import axios from "axios";


const axoisPublic=axios.create({
  baseURL:'https://social-vista-server-side.vercel.app'
})

const useAxoisPublic = () => {
  return axoisPublic;
};

export default useAxoisPublic;