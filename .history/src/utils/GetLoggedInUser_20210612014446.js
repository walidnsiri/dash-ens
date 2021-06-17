import queryapi from "./queryApi";

export function GetLoggedInUser() {
    return queryapi("/public/logged");
  }