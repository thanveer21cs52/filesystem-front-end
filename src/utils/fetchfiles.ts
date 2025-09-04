export default async function fetchfiles(){
        const req=await fetch('http://localhost:3001/files',{
            cache:"no-cache"
        })
        const data=await req.json()
        return data
        
       

    }
