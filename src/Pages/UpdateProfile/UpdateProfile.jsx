import axios from "axios";
import useAuth from "../../Hook/useAuth";

const image_api=import.meta.env.VITE_iMG_API
const image_url=`https://api.imgbb.com/1/upload?key=${image_api}`

const UpdateProfile = () => {
    const {updateUser,user}=useAuth()

    const handleUpdate=async(e)=>{
        e.preventDefault()
        const form=e.target
        const name=form.name.value
        const photo=form.photo.value
        const formData=new FormData()
        formData.append('image',photo)
        const dataPhoto=await axios.post(image_url,formData)
        console.log('Photo Data',dataPhoto)
        
    }

    return (
        <div className="mt-10">
           

<div className="card w-96 bg-glass bg-teal-100 shadow-xl justify-center items-center mx-auto mb-56">
<div className="avatar">
  <div className="w-24 rounded-full mt-5">
    <img src={user.photoURL} />
  </div>
</div>
  <div className="card-body">
    <h2 className="card-title bg-teal-300 px-5 mx-auto">{user.displayName}</h2>
    <form onSubmit={handleUpdate}>
    <label className="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" name='name' className="grow" placeholder="Update Your name" />
</label>

<input type="file" name='photo' className=" mt-5 file-input file-input-bordered w-full max-w-xs" />
<input type="submit" className="btn text-center bg-teal-300" value='Update' />
    </form>
  </div>
</div>
        </div>
    );
};

export default UpdateProfile;