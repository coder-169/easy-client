import Image from 'next/image'
import React from 'react'

const AtmCard = ({ src, number, exp, cvv, type, name }: { type: string, src: string, number: string, exp: string, cvv: string, name: string }) => {
    return (
        <div className="relative  p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="absolute inset-0 opacity-90">
                <Image
                    src={src}
                    width={500}
                    height={500}
                    alt="Background pattern"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-10">
                <div className="ml-auto flex justify-between items-center">
                    <Image width={50} height={50} src={`${type === 'master' ? "/ms.svg" : "/visa.svg"}`} alt="ATM Logo" className="h-10" />
                    <Image src={'/logo-light.png'} width={500} height={500} className='w-40 ' alt='Bank Logo' />
                </div>
                <div>
                    <Image width={50} height={50} src="/chip.png" alt="Card Chip" className="h-8 " />
                    <h2 className="text-xl font-bold tracking-widest mt-4">
                        {number}
                    </h2>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <h2 className="mt-1 text-sm font-code">{name}</h2>
                    </div>
                    <div>
                        <p className="text-xs font-bold">Valid {exp}</p>
                        <p className="text-xs font-bold">CVV {cvv}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AtmCard