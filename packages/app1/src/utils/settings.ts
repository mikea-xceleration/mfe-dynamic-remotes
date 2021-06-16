const settings = {};
export default settings;

export const load = async () =>{
    const result = await fetch('/settings.json');
    const newSettings = await result.json();
    for (let prop in settings) {
        delete settings[prop];
    }
    for (let prop_1 in newSettings) {
        settings[prop_1] = newSettings[prop_1];
    }
    return settings;
}

