import { queryApi } from "../utils/queryApi";

/**
 * @param {String} image user image name in fileupload service
 *
 * @function Returns image from local storage
 */
function getImageFromLocalStorage(image = null) {
  if (image) {
    const storedimage = localStorage.getItem("user-image");
    if (storedimage) return storedimage;
  }

  return image;
}

/**
 * @param {String} img user image name in fileupload service.
 *
 * @function Returns image from service
 */
async function fetchImageFromService(img = null) {
    if(img == null) return img;
     const [image, error] = await queryApi("file/download/" + img);
    if (error) {
        console.error(error);
    }
    if (image) {
        console.log(image);
        return image;
    } 
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
        console.log(localstorageimage)
        console.log("local storage image exists!");
        return localstorageimage;
    }
    const serviceimage = await fetchImageFromService(img);
    if (serviceimage) {
        console.log("image service exists!");
      localStorage.setItem("user-image", serviceimage);
      return serviceimage;
    }
  }
  return img;
}
