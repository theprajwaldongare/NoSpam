import React,{createContext,useState} from "react"

export const ApiDataContext = createContext()

export const ApiDataProvider = ({children}) => {
    const [apiData, setAPIData] = useState("")
    return (
        <ApiDataContext.Provider value={{apiData, setAPIData}}>
            {children}
        </ApiDataContext.Provider>
    )
}