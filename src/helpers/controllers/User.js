export const GetAll = async () => {
    const response = await window.UserController.listUsers();
    return response;
};

export const GetOne = async (obj) => {
    const response = await window.UserController.listUser(obj);
    return response;
};

export const CreateUser = async (obj) => {
    const response = await window.UserController.saveUser(obj);
    return response;
};

export const UpdateUser = async (obj) => {
    const response = await window.UserController.updateUser(obj);
    return response;
};

export const DeleteUser = async (obj) => {
    const response = await window.UserController.deleteUser(obj);
    return response;
};