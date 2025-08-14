import React, { useState } from 'react'

function useFetch(url) {
    const [error,setError] = useState(""),
    [data,setData] = useState(""),
    [loading,setLoading] = useState(false);

    async function get(auth = {},toDo = ()=>{}) {
      setLoading(true);
      try {
        const res = await fetch(url,
                {
                  method: "GET",
                  headers: {"authentication":"application/json"},
                  body: JSON.stringify(body)
                }
              )
      
              const result = await res.json();
              setData(result);
              setLoading(false);

              if (result.status === 200) {
                toDo(result);
              }
      }catch(e){
        setError(e);
        console.error("error getting",e)
      }
    }

    async function post(body = {},toDo = ()=>{}){
      setLoading(true)
        try {
            
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

              if (result.message) {
                toDo(result);
              }
        } catch(e) {
          console.error(e)
          setError(e)
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
                toDo(result);
              }
        } catch(e) {
          console.error(e)
          setError(e)
        }
        
      }  

   return {post, postMedia,data,loading, error}
}

export default useFetch