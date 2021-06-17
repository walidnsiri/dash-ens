import JwtDecode from "jwt-decode"
import { queryApi } from "../utils/queryApi";
/**
 * @param {String} image user image name in fileupload service
 * Returns image from local storage
 */
export function getImageFromLocalStorage(image = null) {
    
    if (image){
        const storedimage = localStorage.getItem("image");
        if (storedimage) return storedimage;
    }

    return image;
  
}

/**
 * @param {String} image user image name in fileupload service
 * Returns image from service
 */
export const fetchImageFromService = async function(img) {
    const [image,error]= await queryApi("file/download/"+img);
    if(error) { console.error(error);}
    if(image) { return image;}
    return null;
  }
