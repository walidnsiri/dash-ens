import JwtDecode from "jwt-decode"

/**
 * @param {String} image user image name in fileupload service
 * Returns image from stored token or serice
 */
export function getImage(image = null) {
    
    if (image){
        const storedimage = localStorage.getItem("image");
        if (storedimage) return storedimage;
    }

    return image;
  
}
