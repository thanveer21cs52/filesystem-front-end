'use client'
import { GiCancel } from "react-icons/gi";
import { FaAngleDoubleRight } from "react-icons/fa";
import fetchfiles from "@/utils/fetchfiles";

async function editfile(e:any,filename:any,open:any){
    e.preventDefault()
        const filenamewithext=filename.filename.split('.')
        const filename1=e.target.filename.value
        const description=e.target.description.value
        console.log(filename1,description)
   
       
      
       if(filename1&&description){
        const req=await fetch(`https://backend-kappa-nine-38.vercel.app/rename/${filename.filename}/${filename1+'.'+filenamewithext[1]}/${description}`,{
            method:"put"
        })
        const data=await req.json()
        if(data.message=='success'){
          
           
              open(false)
        
        }

        }
        return null
        
       }
    

function Modal({refetch,filename,open}:{refetch:any,filename:any,open:any}) {
    
    
    return (
        <div className="bg-gray-800  border border-dashed px-4 py-4" >
            <form className="flex flex-col justify-center items-start gap-4 text-sm font-mono w-full p-3" onSubmit={(e:any)=>editfile(e,filename,open)}>
                       <label htmlFor="desc" className=" w-full  focus:outline-none flex gap-3 items-center "><span className="font-bold text-sm w-28">File Name: </span><input type="text" defaultValue={filename?filename.filename.split('.')[0]:''}  name='filename' className="border border-blue w-3/4 p-1 py-2 focus:outline-none bg-amber-50 text-black rounded-sm " id="file"/></label>
                      <label htmlFor="desc" className=" w-full  focus:outline-none flex gap-3 items-center "><span className="font-bold text-sm w-28">Description: </span><input type="text" defaultValue={filename?filename.description:''} name='description' className="border border-blue w-3/4 p-1 py-2 focus:outline-none bg-amber-50 text-black rounded-sm " id="desc"/></label>
                       <div className="flex justify-evenly space-x-2 w-full"> 
                        <button type="button" className="bg-red-500 p-2 rounded-xs font-bold  w-1/2  flex justify-center items-center gap-1 " onClick={()=>open(false)}> <GiCancel/>Close</button>
                             <button type="submit" className="bg-blue-500 p-2 rounded-xs font-bold w-1/2 flex justify-center items-center gap-1"><FaAngleDoubleRight />save</button>

                       </div>

               
            </form>
        </div>
    );
}

export default Modal;