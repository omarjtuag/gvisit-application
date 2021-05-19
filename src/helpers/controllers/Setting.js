export const GetOne = async () => {
    const response = await window.SettingsController.listSetting();
    return response;
};

export const SaveSettings = async (obj) => {
    const response = await window.SettingsController.saveSettings(obj);
    return response;
};