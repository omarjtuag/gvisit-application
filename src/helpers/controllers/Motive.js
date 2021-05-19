export const GetAll = async () => {
    const response = await window.MotiveController.listMotives();
    return response;
};

export const GetOne = async (obj) => {
    const response = await window.MotiveController.listMotive(obj);
    return response;
};

export const CreateMotive = async (obj) => {
    const response = await window.MotiveController.saveMotive(obj);
    return response;
};

export const UpdateMotive = async (obj) => {
    const response = await window.MotiveController.updateMotive(obj);
    return response;
};

export const DeleteMotive = async (obj) => {
    const response = await window.MotiveController.deleteMotive(obj);
    return response;
};