import queryapi from "./queryApi";

export function GetLoggedInUser() {
    let user = null;
    let error = null;
    [user , error] = queryapi("/public/logged");
    if(error) return error;
    return user;
  }