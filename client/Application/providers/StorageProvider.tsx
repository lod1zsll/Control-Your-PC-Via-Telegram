import React, { useState, useContext, createContext } from "react";
import useLocalStorage from "../modules/useLocalStorage";

interface IStorageProvider {
    
}

const StorageContext = createContext<IStorageProvider>({} as IStorageProvider);

export function StorageProvider({ children }: any) {

    

    let value = {
        
    };

    return <StorageContext.Provider value={value as any}>{children}</StorageContext.Provider>;
}

export function useStorageProvider() {
    return useContext(StorageContext);
}