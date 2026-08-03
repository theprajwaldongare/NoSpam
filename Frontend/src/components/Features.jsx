import React from 'react'

const Features = () => {
    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-lg select-none">
            <div
                className="bg-surface-container border border-surface-variant rounded-xl p-stack-md flex flex-col items-center text-center group transition-colors">
                <div
                    className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-stack-md group-hover:bg-primary-container/20 transition-colors">
                    <span className="material-symbols-outlined text-primary">memory</span>
                </div>
                <h4 className="font-bold text-on-surface mb-2">Powered by ML</h4>
                <p className="text-sm text-on-surface-variant">Analyzes text patterns to identify spam messages.</p>
            </div>
            <div
                className="bg-surface-container border border-surface-variant rounded-xl p-stack-md flex flex-col items-center text-center group transition-colors">
                <div
                    className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-stack-md group-hover:bg-primary-container/20 transition-colors">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                </div>
                <h4 className="font-bold text-on-surface mb-2">Lightning Fast</h4>
                <p className="text-sm text-on-surface-variant">Real-time analysis delivers actionable
                    results in milliseconds.</p>
            </div>
            <div
                className="bg-surface-container border border-surface-variant rounded-xl p-stack-md flex flex-col items-center text-center group transition-colors">
                <div
                    className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-stack-md group-hover:bg-primary-container/20 transition-colors">
                    <span className="material-symbols-outlined text-primary">lock</span>
                </div>
                <h4 className="font-bold text-on-surface mb-2">Privacy First</h4>
                <p className="text-sm text-on-surface-variant">Your data is never stored. Analysis is
                    entirely ephemeral.</p>
            </div>
        </div>
    )
}

export default Features