import { queryApi } from "../utils/queryApi";
import {trackPromise } from 'react-promise-tracker';

/**
 * @param {String} image user image name in fileupload service
 *
 * @function Returns image from local storage
 */
function getImageFromLocalStorage(image = null) {
  if (image) {
    const storedimage = localStorage.getItem("user-image");
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
  
    if(img == null) return img;
    const [image, error] = await queryApi("file/display/" + img)
    trackPromise(
      queryApi("file/display/" + img).then((image,error) => {
        if (error) {
          console.error(error);
        }
        if (image) {
          return  `data:image/${img.substr(img.indexOf('.'))};base64,` + image;
        } 
        
      })
    );   
    return image;
  
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
      localStorage.setItem("user-image", serviceimage);
      return serviceimage;
    }
  }
  return img;
}
