import React, { useState, useEffect } from "react";
import { loadDynamicScript, unloadScript } from "../utils/scripts";
import settings from "../utils/settings";

export const useLazyLoading = (dynamicModule: string) => {
  const [Component, setComponent] =
    useState<React.LazyExoticComponent<React.ComponentType<any>>>();
  const [scriptId, setScriptId] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadComponent = async (scope: string, module: string) => {
    // @ts-ignore
    await __webpack_init_sharing__("default");

    const container = window[scope];
    //@ts-ignore
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };

  useEffect(() => {
    setIsLoading(true);
    let [scope, module] = dynamicModule.split("/");
    setError("");
    if (scriptId !== null) {
      unloadScript(scriptId);
      setScriptId(null);
    }
    var url = settings["remotes"][scope];
    loadDynamicScript(scope, url)
      .then((id) => {
        setScriptId(id);
        setComponent(React.lazy(() => loadComponent(scope, "./" + module)));
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
    return () => {
      if (scriptId !== null) {
        unloadScript(scriptId);
      }
    };
  }, [dynamicModule]);
  return {Component, error,isLoading};
};
