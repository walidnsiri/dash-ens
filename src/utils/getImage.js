import { queryApi } from "../utils/queryApi";
//import {trackPromise } from 'react-promise-tracker';

/**
 * @param {String} image user image name in fileupload service
 *
 * @function Returns image from local storage
 */
function getImageFromLocalStorage(image = null) {
  if (image) {
    const storedimage = localStorage.getItem(image);
    if (storedimage){
        return storedimage;
    }
  }
  return null;
}

/**
 * @param {String} img user image name in fileupload service.
 *
 * @function Returns image from service
 */
export async function fetchImageFromService(img = null) {
    if(img === null || img.includes("base64")) return img;
    const [result,]  =  await queryApi("file/display/" + img);
    if (result) {
      return `data:${result.type};base64,` + result.value;
    }
}

/**
 * @param {String} img user image name in fileupload service.
 *
 * @function Returns image from service if it doesn't exist in localstorage
 */
export async function GetImage(img = null) {
  if (img) {
    const localstorageimage = getImageFromLocalStorage(img);
    if (localstorageimage) {
        return localstorageimage;
    }
    const serviceimage = await fetchImageFromService(img);
    if (serviceimage) {
      localStorage.setItem(img, serviceimage);
      return serviceimage;
    }
  }
  return img;
}
