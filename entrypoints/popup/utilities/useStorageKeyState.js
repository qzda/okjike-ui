import { useEffect, useRef, useState } from "react";
import { defaultPreferences } from "../../../storage-keys";
import { getStorage, setStorage } from "./chromeStorage";

export default function useStorageKeyState(storageKey) {
  const [state, setState] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const savedSetting = await getStorage(storageKey);
        if (savedSetting !== undefined) {
          setState(savedSetting === "on" ? true : false);
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setLoaded(true);
      }
    };

    getInitialState();
  }, [storageKey]);

  const prevState = useRef(state);

  useEffect(() => {
    const updateStorage = async () => {
      try {
        await setStorage({ [storageKey]: state ? "on" : "off" });
      } catch (error) {
        console.warn(error);
      }
    };

    if (prevState.current !== state) {
      updateStorage();
    }

    prevState.current = state;
  }, [storageKey, state]);

  return [state, setState, loaded];
}

export function useStorageValue(storageKey) {
  const [value, setValue] = useState(defaultPreferences[storageKey]);

  useEffect(() => {
    const getInitialState = async () => {
      try {
        const savedSetting = await getStorage(storageKey);
        if (savedSetting !== undefined) {
          setValue(savedSetting);
        }
      } catch (error) {
        console.warn(error);
      }
    };

    getInitialState();
  }, [storageKey]);

  return value;
}
