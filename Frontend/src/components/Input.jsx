import React, { useContext, useState } from 'react'

const Input = () => {
    const [inputData, setInputData] = useState("")

    const searchInput = ()=>{
        console.log(inputData)
    }
    return (
        <div
            className="w-full max-w-4xl bg-surface-container-low border border-surface-variant rounded-xl p-stack-md shadow-sm transition-all duration-300  focus-within:ring-1 focus-within:ring-primary-container">
            <textarea
                className="w-full h-48 bg-transparent text-on-surface font-body-md border-none resize-none focus:ring-0 focus:outline-none"
                placeholder="Paste the suspicious message here..."  onChange={(e)=>{setInputData(e.target.value)}}></textarea>
            <div className="flex justify-end mt-stack-md text-black">
                <button
                    className="bg-primary-container font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 font-bold cursor-pointer" onClick={()=>{searchInput()}}>
                    <span className="material-symbols-outlined text-[18px]">analytics</span>
                    Analyze Message
                </button>
            </div>
        </div>
    )
}

export default Input