import React,{createContext,useState} from "react"

export const ApiDataContext = createContext()

export const ApiDataProvider = ({children}) => {
    const [apiData, setAPIData] = useState("")
    const [spamWords, setSpamWords] = useState("")
    return (
        <ApiDataContext.Provider value={{apiData, setAPIData,spamWords, setSpamWords}}>
            {children}
        </ApiDataContext.Provider>
    )
}