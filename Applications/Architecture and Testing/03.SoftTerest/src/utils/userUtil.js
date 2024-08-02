function getUser() {
    return sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData"));
}

function setUser(userData) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
}

function hasUser() {
    return !!getUser();
}

function hasOwner(id) {
    return getUser()._id == id
}

function removeUser() {
    sessionStorage.removeItem("userData")
}

export {
    getUser,
    setUser,
    hasUser,
    hasOwner,
    removeUser
}