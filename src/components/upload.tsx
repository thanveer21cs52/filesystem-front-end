'use client'
import { ChangeEvent, useState } from "react";
import { BiFileBlank, BiFileFind } from "react-icons/bi";
import { BsUpload } from "react-icons/bs";
import { FaFileArrowUp } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";


function Upload({refetch}:{refetch:any}) {
   function handlefile(e: any) {
    const files = e.target.files?.[0];
    if (files) {
        setfile(files);
        console.log(files);
    }
}

    async function handlesubmit(e:any){
        e.preventDefault()
        setlooding(true)
        const desc=e.target?.description.value
         console.log(desc)
         const formData = new FormData();
         if (!file) return;
         if(!desc) return alert("please enter desc")

    formData.append("myfile", file);
     formData.append("description", desc);


    try {
      const res = await fetch("https://backend-kappa-nine-38.vercel.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); 
      if(data.message=="success"){
        refetch()
        alert("upload successfully")
        setfile(null)
        setlooding(false)
        
      }
    } catch (err) {
         setlooding(false)
      console.error(err);
      alert("Upload failed");
    }

    }
    const [file,setfile]=useState<File|null>(null)
    const [loading,setlooding]=useState<boolean>(false)
    
    return (
        <form className=" flex flex-col justify-center items-center  cursor-pointer text-sm min-w-full font-mono " onSubmit={handlesubmit} encType="multipart/form-data"
        > 
            {file==null&&<div className="flex flex-col items-center justify-center min-w-full p-4   ">

      <input 
        type="file" 
        id="fileUpload" 
        name="myfile"
        className="hidden" 
        onChange={handlefile}
      />

 
      <label 
        htmlFor="fileUpload" 
        className="bg-gray-800 flex p-2 flex-col justify-center items-center space-y-3 py-10 border-2 border-dashed cursor-pointer border-white w-[60%]"
      >
        <BsUpload className="text-amber-50 text-xl" />
        <h2 className="text-amber-50">
          <span className="font-bold">Click here</span> to upload your file
        </h2>
        
      </label>
    </div>}
    {file!=null&&
    <div className="flex flex-col bg-gray-800   p-4  min-w-[60%] justify-center border border-white mt-5 space-y-3 text-xs border-dashed">
        <h2 className=" text-start text-xl font-bold">File datails</h2>  
        <p className="flex   w-full justify-start items-center gap-0.5 ">
            <span className="font-bold text-sm mr-2"> Filename:</span>
           
            <BiFileBlank/>
            {file.name}
        
        </p>
        <label htmlFor="desc" className=" w-full  focus:outline-none flex gap-3 items-center "><span className="font-bold text-sm">Description: </span><input type="text"  name='description' className="border border-blue w-3/4 p-1 py-2 focus:outline-none bg-amber-50 text-black rounded-sm " id="desc"/></label>
       <div className="flex justify-evenly space-x-2"> 
        <button type="submit" className="bg-red-500 p-2 rounded-xs font-bold  w-1/2  flex justify-center items-center gap-1 " onClick={()=>setfile(null)}> <GiCancel/>Close</button>
             <button type="submit" className="bg-blue-500 p-2 rounded-xs font-bold w-1/2 flex justify-center items-center gap-1"><FiUpload />upload</button>
        

       </div>
   
        

    </div>}

            
        </form>
    );
}

export default Upload;