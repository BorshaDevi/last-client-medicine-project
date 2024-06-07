import { useQuery } from "@tanstack/react-query";
import usePublie from "../../Hook/usePublie";
import { Link } from "react-router-dom";


const CategorySection = () => {
    const axiosPublic=usePublie()
    const {data : categorySection =[]}=useQuery({
        queryKey:['categorySection'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/categorySection')
            console.log(res.data)
            return res.data;
        }
    })

    return (
        <div>
            <h1 className="uppercase text-center text-2xl font-semibold">category of <span className="text-teal-600">medicine</span></h1>
       <div className="grid lg:grid-cols-3 gap-5 ml-5">
        {
            categorySection.map(cat => <Link key={cat._id} to={`/categoryDetail/${cat?.categoryName}`}>
               <div  className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={cat.photo} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title uppercase bg-teal-400 px-5 rounded-r-xl rounded-l-xl">{cat.categoryName}</h2>
              <p className="font-bold "> Category base No: <span className="text-red-800">{cat.number}</span></p>
              
            </div>
          </div>
            </Link> )
        }

       </div>
        </div>
    );
};

export default CategorySection;