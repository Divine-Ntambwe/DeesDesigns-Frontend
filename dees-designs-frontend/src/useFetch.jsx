import React, { useState } from 'react'

function useFetch(url) {
    const [error,setError] = useState(""),
    [data,setData] = useState(""),
    [loading,setLoading] = useState(false);


    async function post(body = {},toDo = ()=>{}){
        try {
            setLoading(true)
            const res = await fetch(url,
                {
                  method: "POST",
                  headers: {"Content-Type":"application/json"},
                  body: JSON.stringify(body)
                }
              )
      
              const result = await res.json();
              setData(result);
              setLoading(false);
              console.log(result)
              if (result.message) {
                toDo();
              }
        } catch(e) {
          console.error(e)
        }
        
      }

      async function postMedia(body = {},toDo = ()=>{}){
        try {
            setLoading(true)
            const res = await fetch(url,
                {
                  method: "POST",
                  body: body             
               }
              )
      
              const result = await res.json();
              setData(result);
              setLoading(false);
              if (result.message) {
                toDo();
              }
        } catch(e) {
          console.error(e)
        }
        
      }  

   return {post, postMedia,data,loading}
}

export default useFetch