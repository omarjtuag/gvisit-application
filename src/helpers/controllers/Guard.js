export const GetAll = async () => {
    const response = await window.GuardController.listEntrys();
    return response;
};