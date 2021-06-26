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

export const LoaderSmall = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div className="loader">
    <Loader type="ThreeDots" color="#DDDDDD" height={28} width={28} />
    </div>
  );
}

