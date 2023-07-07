export const clearSessionStorage = () => {
    sessionStorage.removeItem("whiteTaxes");
}

export const clearLocalStorage = () => {
    localStorage.removeItem("token");
}
