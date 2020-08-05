export const saveLoginData = (loginData) => {
    localStorage.setItem('userData', JSON.stringify(loginData));
};
export const deleteLoginData = () => {
    localStorage.removeItem('userData');
};
