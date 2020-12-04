import React, {cloneElement} from "react";

const Child = ({ componentToPassDown, filterscallback }) => {
  
  function filtercallback ( data ){
    filterscallback(data);
  }
  
  return <>
  {cloneElement(componentToPassDown, {
    filterscallback: filtercallback
  })}
  </>;
};

export default Child;
