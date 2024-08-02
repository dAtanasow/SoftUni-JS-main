function getUser() {
    return sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData"));
}

function setUser(userData) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
}

function hasUser() {
    return !!getUser();
}

function hasOwner(ownerId) {
    const id = getUserId();
    return id === ownerId;
}

function removeUser() {
    sessionStorage.removeItem("userData")
}

function getUserId() {
    const userData = getUser();
    return userData?._id
}

export const util = {
    getUser,
    getUserId,
    setUser,
    hasUser,
    hasOwner,
    removeUser
}