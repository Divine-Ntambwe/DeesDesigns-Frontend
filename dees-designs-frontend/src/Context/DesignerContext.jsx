import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../useFetch';
export const designerContext = createContext();
import { Authentication } from '../App';
function DesignerContext({children}) {
    const {userDetails} = useContext(Authentication)
    const {get} = useFetch(`/designersProducts/${userDetails._id}`);
    const [allDesignersDesigns,setAllDesignersDesigns] = useState();
    const [fetch,setFetch] = useState(false)
    useEffect(()=>{
      
        get((d)=>{
            setFetch(false)
            setAllDesignersDesigns(d)
        })
    },[fetch])
  return (
    <designerContext.Provider value={{allDesignersDesigns,setFetch}}>
        {children}
    </designerContext.Provider>
  )
}

export default DesignerContext