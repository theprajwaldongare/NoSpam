import React, { useContext, useState, useEffect, useRef } from 'react'
import { ApiDataContext } from '../context/ApiData'

const Analysis = () => {
    const analysisRef = useRef(null)
    const { analysis } = useContext(ApiDataContext)

    useEffect(() => {
        if (analysis) {
            analysisRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }, [analysis])


    return (
        <>
            {analysis && <div ref={analysisRef} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-lg">

                <div
                    className="col-span-1 md:col-span-1 bg-surface-container border border-surface-variant rounded-xl p-stack-lg flex flex-col items-center justify-center text-center">
                    <div className="relative w-32 h-32 flex items-center justify-center mb-stack-md">

                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-surface-variant"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className={analysis?.spamProbability >= 50 ? "text-error" : "text-green"}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="currentColor" strokeDasharray={`${analysis?.spamProbability || 0}, 100`}
                                strokeWidth="3"></path>
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className={`font-headline-md text-headline-md font-bold ${analysis?.spamProbability >= 50 ? "text-error" : "text-green"}`}>
                                {analysis?.spamProbability || 0}%
                            </span>
                        </div>
                    </div>
                    <h3 className="font-headline-md text-[20px] text-on-surface mb-stack-sm">Spam Probability
                    </h3>
                    <span className={`font-label-sm px-3 py-1 rounded-full ${analysis?.spamProbability >= 50
                        ? "bg-error-container text-on-error-container"
                        : "bg-green-container text-on-green-container"
                        }`}>
                        {analysis?.spamProbability >= 50 ? "High Risk" : "Low Risk"}
                    </span>
                </div>

                <div
                    className="col-span-1 md:col-span-2 bg-surface-container border border-surface-variant rounded-xl p-stack-lg">
                    <h3
                        className={`font-headline-md text-[20px] border-b border-surface-variant pb-stack-sm mb-stack-md font-bold ${analysis?.spamProbability === undefined || analysis?.spamProbability === null
                            ? "text-on-surface"
                            : analysis?.spamProbability >= 50
                                ? "text-error"
                                : "text-green"
                            }`}
                    >
                        {analysis?.spamProbability === undefined || analysis?.spamProbability === null
                            ? "ANALYSIS"
                            : analysis?.spamProbability >= 50
                                ? "SPAM"
                                : "NOT SPAM"}
                    </h3>
                    <div className="space-y-stack-lg">
                        {(analysis?.spamProbability >= 50 && (analysis?.spamWords?.trim() || analysis?.contentAnalysis?.currency > 0 || analysis?.contentAnalysis?.digits > 0 || analysis?.spamProbability >= 60)) && <div>
                            <h4
                                className="font-bold text-on-surface text-sm mb-stack-sm uppercase tracking-wider opacity-70">
                                Reasons</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {analysis?.spamWords?.trim()?.split(" ").length > 2 && <div
                                    className="flex items-center gap-3 p-3 bg-surface-container-low border border-surface-variant rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-error text-[20px]">warning</span>
                                    <span
                                        className="text-on-surface-variant text-sm font-medium">Suspicious
                                        Keywords</span>
                                </div>}
                                {analysis?.contentAnalysis?.currency > 0 && <div
                                    className="flex items-center gap-3 p-3 bg-surface-container-low border border-surface-variant rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-error text-[20px]">payments</span>
                                    <span
                                        className="text-on-surface-variant text-sm font-medium">Currency
                                        Symbols</span>
                                </div>}
                                {analysis?.contentAnalysis?.digits > 0 && <div
                                    className="flex items-center gap-3 p-3 bg-surface-container-low border border-surface-variant rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-error text-[20px]">pin</span>
                                    <span
                                        className="text-on-surface-variant text-sm font-medium">Excessive
                                        Digits</span>
                                </div>}
                                {analysis?.spamProbability >= 60 && <div
                                    className="flex items-center gap-3 p-3 bg-surface-container-low border border-surface-variant rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-error text-[20px]">campaign</span>
                                    <span
                                        className="text-on-surface-variant text-sm font-medium">Promotional
                                        Language</span>
                                </div>}
                            </div>
                        </div>}

                        <div>
                            <h4
                                className="font-bold text-on-surface text-sm mb-stack-sm uppercase tracking-wider opacity-70">
                                Content Analysis</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                <div
                                    className="bg-surface-container-low border border-surface-variant rounded p-3 flex flex-col">
                                    <span
                                        className="text-label-sm text-on-surface-variant">Characters</span>
                                    <span className="font-bold text-on-surface text-body-lg">{analysis?.contentAnalysis?.characters}</span>
                                </div>
                                <div
                                    className="bg-surface-container-low border border-surface-variant rounded p-3 flex flex-col">
                                    <span
                                        className="text-label-sm text-on-surface-variant">Words</span>
                                    <span
                                        className="font-bold text-on-surface text-body-lg">{analysis?.contentAnalysis?.words}</span>
                                </div>
                                <div
                                    className="bg-surface-container-low border border-surface-variant rounded p-3 flex flex-col">
                                    <span
                                        className="text-label-sm text-on-surface-variant">Digits</span>
                                    <span
                                        className="font-bold text-on-surface text-body-lg">{analysis?.contentAnalysis?.digits}</span>
                                </div>
                                <div
                                    className="bg-surface-container-low border border-surface-variant rounded p-3 flex flex-col">
                                    <span
                                        className="text-label-sm text-on-surface-variant">URLs</span>
                                    <span
                                        className="font-bold text-on-surface text-body-lg">{analysis?.contentAnalysis?.urls}</span>
                                </div>
                                <div
                                    className="bg-surface-container-low border border-surface-variant rounded p-3 flex flex-col">
                                    <span
                                        className="text-label-sm text-on-surface-variant">Currency</span>
                                    <span
                                        className="font-bold text-on-surface text-body-lg">{analysis?.contentAnalysis?.currency}</span>
                                </div>
                                <div
                                    className="bg-surface-container-low border border-surface-variant rounded p-3 flex flex-col">
                                    <span className="text-label-sm text-on-surface-variant">!
                                        Marks</span>
                                    <span
                                        className="font-bold text-on-surface text-body-lg">{analysis?.contentAnalysis?.exclamation}</span>
                                </div>
                            </div>
                        </div>

                        {analysis?.spamWords?.trim() ? <div>
                            <h4
                                className="font-bold text-on-surface text-sm mb-stack-sm uppercase tracking-wider opacity-70">
                                Detected Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                                {analysis?.spamWords?.trim().split(" ").map((word, index) => (
                                    <span key={index} className="px-3 py-1 bg-error/10 border border-error/20 text-error text-label-sm rounded-full font-bold">{word.toUpperCase()}</span>

                                ))}

                            </div>
                        </div> : ""}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Analysis