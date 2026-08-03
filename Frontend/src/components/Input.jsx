import React, { useContext, useState } from 'react'
import { ApiDataContext } from '../context/ApiData'

const Input = () => {
    const [inputData, setInputData] = useState("")
    const { analysis, setAnalysis } = useContext(ApiDataContext)
    const [backendLoading, setBackendLoading] = useState(false)

    const searchInput = async () => {
        if (!inputData.trim()) {
            return
        }

        setBackendLoading(true)


        try {
            const res = await fetch("/predict", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: inputData
                })
            })
            if (!res.ok) {
                console.log(await res.text())
                return
            }
            const data = await res.json()
            console.log(data.prediction)
            console.log(data.spamWords)


            setAnalysis(data)
        } catch (error) {
            console.log(error)
        } finally {
            setBackendLoading(false)
        }
    }
    return (
        <div
            className=" relative w-full max-w-4xl bg-surface-container-low border border-surface-variant rounded-xl p-stack-md shadow-sm transition-all duration-300  focus-within:ring-1 focus-within:ring-primary-container">
            <textarea
                className="w-full h-64 bg-transparent text-on-surface font-body-md border-none resize-none focus:ring-0 focus:outline-none scrollbar-hide"
                placeholder="Paste the suspicious message here..." onChange={(e) => { setInputData(e.target.value) }}></textarea>
            <div className="absolute bottom-stack-md right-stack-md flex justify-end text-black select-none">
                {!backendLoading ? <button
                    className="bg-primary-container font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 font-bold cursor-pointer" onClick={() => { searchInput() }}>
                    <span className="material-symbols-outlined text-[18px]">analytics</span>
                    Analyze Message
                </button> : <div role="status" className="relative inline-block w-12 h-12 rounded-full bg-transparent border-2 border-slate-900 animate-spin dark:border-slate-50" style={{ borderRadius: '50%' }}>
                    <div className="absolute top-1 left-1 w-3 h-3 rounded-full border-2 border-slate-900 bg-slate-900 dark:border-slate-50 dark:bg-slate-50"></div>
                    <span className="sr-only">Loading…</span>
                </div>}
            </div>
        </div>
    )
}

export default Input