import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
export const designerContext = createContext();
import { Authentication } from "../App";
function DesignerContext({ children }) {
  const { userDetails, role } = useContext(Authentication);
  const { get:getDP } = useFetch(`/designersProducts/${userDetails._id}`);
  const [allDesignersDesigns, setAllDesignersDesigns] = useState();
  const [allDesigners,setAllDesigners] = useState();
  const [fetch, setFetch] = useState(false);
  const { get:getD } = useFetch(`/designersContactInfo`);
  useEffect(() => {
    if (role === "designer") {
      getDP((d) => {
        setFetch(false);
        setAllDesignersDesigns(d);
        
      });


    }

    getD((data)=>{
      setAllDesigners(data)
    })
  }, [fetch]);
  return (
    <designerContext.Provider value={{ allDesignersDesigns, setFetch,allDesigners }}>
      {children}
    </designerContext.Provider>
  );
}

export default DesignerContext;
