import React from 'react';
import Loader from 'react-loader-spinner';
import {usePromiseTracker} from 'react-promise-tracker';

export const LoaderLarge = props => {
  const { promiseInProgress } = usePromiseTracker();
 
 return (
   promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
 <div className="loader">
    <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
  </div>
  </div>);
}

export const LoaderLargeArea = props => {
  const { promiseInProgress } = usePromiseTracker({area: props.area, delay: 0});
 
 return (
   promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
 <div className="loader">
    <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
  </div>
  </div>);
}



export const LoaderSmall = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
    <div className="loader">
    <Loader type="ThreeDots" color="#CC041C" height={100} width={100} />
    </div>
    </div>
  );
}

  export const LoaderSmallArea = (props) => {
    const { promiseInProgress } = usePromiseTracker({area: props.area, delay: 0});
    return (
      promiseInProgress &&
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      <div className="loader">
      <Loader type="ThreeDots" color={props.color?  props.color : "#CC041C"} height={props.height? props.height: "100"} width={props.width? props.width : "100"} />
      </div>
      </div>
    );
}



