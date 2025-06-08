import React from 'react'

const Heading = ({ title, subtitle, classes }: { title: string, subtitle: string, classes?: string }) => {
    return (
        <div className={`${classes}`}>
            <h2 className="text-4xl font-semibold mt-4 mb-2 text-n-1">{title}</h2>
            <p className="body-2 mt-4 text-n-4">
                {subtitle}
            </p>
        </div>
    )
}

export default Heading