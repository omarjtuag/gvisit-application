export const SignIn = async (obj) => {
    const response = await window.AuthController.signin(obj);
    return response;
}