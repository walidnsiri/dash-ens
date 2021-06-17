import JwtDecode from "jwt-decode"
import { queryApi } from "../utils/queryApi";
/**
 * @param {String} image user image name in fileupload service
 * 
 * @function Returns image from local storage
 */
export function getImageFromLocalStorage(image = null) {
    
    if (image){
        const storedimage = localStorage.getItem("image");
        if (storedimage) return storedimage;
    }

    return image;
  
}

/**
 * @param {String} img user image name in fileupload service.
 * 
 * @function Returns image from service
 */
export async function fetchImageFromService(img = null) {
    const [image,error]= await queryApi("file/download/"+img);
    if(error) { console.error(error);}
    if(image) { return image;}
    return image;
  }
