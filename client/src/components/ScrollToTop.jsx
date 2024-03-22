import { useEffect } from "react";
import { useLocation } from "react-router-dom";

 const ScrollToTop = () => {
    const {pathname} =useLocation();
    useEffect(() =>{
        window.scrollTo(0,0);
    },[pathname]);//here  we specify that the effect should only be applied if
     return null; //then we return  nothing because this component does not render anything
  
}

export default ScrollToTop;
