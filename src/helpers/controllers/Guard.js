export const GetAll = async () => {
    const response = await window.GuardController.listEntrys();
    return response;
};

export const UpdateEntry = async (id) => {
    const response = await window.GuardController.updateEntry(id);
    return response;
};

export const UpdateEvac = async () => {
    const response = await window.GuardController.updateExit();
    return response;
};