import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest text-primary dark:text-primary font-label-sm text-label-sm full-width bottom border-t border-surface-variant dark:border-surface-variant flat no shadows">
            <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-desktop w-full max-w-container-max mx-auto">
                <div className="font-headline-md text-[16px] font-bold text-primary dark:text-primary mb-4 md:mb-0">
                    © NoSpam. Secure &amp; Private.
                </div>

            </div>
        </footer>
    )
}

export default Footer