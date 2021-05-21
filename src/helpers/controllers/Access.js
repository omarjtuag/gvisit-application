export const CreateEntry = async (obj) => {
    const response = await window.EntryController.registerEntry(obj);
    return response;
};

export const CreateExit = async (obj) => {
    const response = await window.ExitController.registerExit(obj);
    return response;
};

export const CreateVisitor = async (obj) => {
    const response = await window.FirstController.registerVisitor(obj);
    return response;
};

export const UpdateVisitor = async (obj) => {
    const response = await window.UpdateController.updateVisitor(obj);
    return response;
};

export const GetPolicy = async () => {
    const response = await window.FirstController.policy();
    return response;
};

export const GetSetting = async () => {
    const response = await window.FirstController.settings();
    return response;
};