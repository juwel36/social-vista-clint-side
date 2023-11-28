import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Spinner from "./Spinner";
import Wave from "react-wavify";

const Suggestedtag = () => {
  const axoisPublic = useAxiosPublic();

  const { isPending, data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await axoisPublic.get('/tags');
      return res.data;
    }
  });

  if (isPending) return <Spinner></Spinner>;

  return (
    <div>
       <div className="text-center  w-full mx-auto ">
      <p className="text-blue-600 font-semibold text-xl"> Suggested Tag for Search:  </p>
    
    </div>
      <h1 className="font-medium font-mono py-2"> </h1>

      <div className="relative mb-5">
        <Wave
          fill='#2F80ED'
          paused={false}
          className="absolute top-0   left-0 w-full"
          options={{
            height: 5,
            amplitude: 10,
            speed: 0.15,
            points: 3
          }}
        />
        <div className="flex flex-wrap gap-10 items-center justify-center  p-5 rounded-lg relative z-10">
          {tags?.map(item => (
            <div key={item._id}>
              <p className="font-bold text-white"> # {item.tags} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestedtag;
