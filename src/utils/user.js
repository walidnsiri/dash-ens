


export const hasRole = (user,role) => {
    if(user){
    if(user.authorities?.filter(a => a.authority == role).length > 0) return true;
    return false;
    }
}