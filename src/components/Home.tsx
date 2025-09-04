'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Upload from './upload'
import List from './List'
import Modal from './modal'

function Home() {
    const [fetchdata,setfetch]=useState(true)
    const [edit,setedit]=useState(false)
  
    const [filename,setfilename]=useState<any>({filename:'',
                  description:''
                })
    const [data,setdata]=useState([])
 
    function openedit(value:any){
      setfilename(value)
      console.log(value)

    }
    useEffect(()=>{
        console.log(fetchdata,"Sdsd")
        
    },[fetchdata])
    function refetch(){
        setfetch(!fetchdata)
    }
    function open(value:any){
      setedit(value)
      setfetch(!fetchdata)
    }
  return (
    <div className="flex flex-col justify-center items-center w-3/5 my-5 text-white">
        <Suspense fallback={<h1>loading....</h1>}>
        {!edit&&<Upload refetch={refetch}/>}
        {edit&&<Modal refetch={refetch} filename={filename} open={open} />}
      <List fetchdata={fetchdata} filename={openedit} open={open}  />
        
        </Suspense>
      
    </div>
  )
}

export default Home