"use client";

import * as React from "react";

import AppStoreImpl from "@/stores/AppStore";
import { AppStore, AppStoreData } from "@/types/AppStore";
import {
  enableStaticRendering as mobxEnableStaticRendering,
  useLocalObservable,
} from "mobx-react";

/*
 * Store creation / hydration is different in client versus server.
 */
const IS_SERVER: boolean = typeof window === "undefined";

/*
 * If executing on server, enable MobX static rendering.
 */
mobxEnableStaticRendering(IS_SERVER);

/*
 * Client singleton AppStore.
 */
let INSTANCE: AppStore | null = null;

/*
 * Client context for accessing the AppStore.
 */
const storeContext = React.createContext<AppStore | null>(null);

export interface AppStoreProviderProps extends React.PropsWithChildren<{}> {
  initialData: AppStoreData;
}

export const AppStoreProvider = ({
  children,
  initialData,
}: AppStoreProviderProps): React.ReactElement => {
  const store = useLocalObservable((): AppStore => {
    // When executing on server, always create new AppStore.
    if (IS_SERVER) {
      return new AppStoreImpl(initialData);
    }

    // When executing on client, create and use singleton AppStore.
    if (INSTANCE === null) {
      INSTANCE = new AppStoreImpl(initialData);
    }

    return INSTANCE;
  });

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

/*
 * Hook for accessing the AppStore.
 */
export const useAppStore = () => {
  const store = React.useContext(storeContext);

  if (!store) {
    throw new Error("useAppStore must be called within an AppStoreProvider.");
  }

  return store;
};

export default AppStoreProvider;
