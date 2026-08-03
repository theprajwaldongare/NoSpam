import React,{createContext,useState} from "react"

export const ApiDataContext = createContext()

export const ApiDataProvider = ({children}) => {
    const [analysis, setAnalysis] = useState(null)

    return (
        <ApiDataContext.Provider value={{analysis,setAnalysis}}>
            {children}
        </ApiDataContext.Provider>
    )
}