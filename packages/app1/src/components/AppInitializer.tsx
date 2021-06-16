import React,{ FC, useEffect, useState } from "react";
import { load } from "../utils/settings";

const AppInitializer: FC = ({ children }) => {
    const [isSettingsLoaded,setIsSettingsLoaded] = useState(false)
    useEffect(() => {
       load().then(config=>setIsSettingsLoaded(true));
    }, []);
    if (!isSettingsLoaded) {
      return <></>;
    }
    return <>{children}</>;
  };
  
  export default AppInitializer;