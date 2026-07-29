import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="bg-background dark:bg-background text-primary dark:text-primary font-body-md text-body-md docked full-width top-0 border-b border-surface-variant dark:border-surface-variant flat no shadows">
                <div className="flex justify-between items-center h-16 px-margin-desktop max-w-container-max mx-auto w-full">
                    <div
                        className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary dark:text-primary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                        NoSpam
                    </div>
                    <div></div>
                </div>
            </nav>

        </>
    )
}

export default Navbar