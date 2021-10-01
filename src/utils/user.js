


export const hasRole = (user,role) => {
    if(user){
    if(user.authorities?.filter(a => a.authority == role).length > 0) return true;
    return false;
    }
    return false;
}

export const getUserIds = (users) => {
    let ids = [];
    users.map((user,index) => {
        ids.push(user.id);
    })
    return ids;
}