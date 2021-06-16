const isValidOptions = (id: string, url: string) => {
    var msg = "";
    if (id == null || id.trim() === "") {
      msg = "id cannot be empty";
      console.log(msg);
      return [false, msg];
    }
    if (url == null || url.trim() === "") {
      msg = "url cannot be empty";
      console.log(msg);
      return [false, msg];
    }
    return [true, msg];
  };
  
  export const loadDynamicScript = (id: string, url: string): Promise<string> => {
    let p = new Promise<string>((resolve, reject) => {
      let [isValid, error] = isValidOptions(id, url);
      if (!isValid) {
        reject(error);
      } else {
        var scriptId = "script_" + id;
        var existingScript = document.getElementById(scriptId);
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = url;
          script.id = scriptId;
          script.onload = () => {
            console.log("Script Loaded: " + url);
            resolve(scriptId);
          };
          script.onerror = () => {
            const msg = "Script Error: " + url;
            console.log(msg);
            reject(msg);
          };
          document.head.appendChild(script);
        } else {
          resolve(null);
        }
      }
    });
    return p;
  };
  
  export const unloadScript = (id: string) => {
    console.log("Script removed" + id);
    let scriptToRemove = document.getElementById(id);
    document.head.removeChild(scriptToRemove);
  };
  