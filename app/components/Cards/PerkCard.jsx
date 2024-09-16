import React from 'react'
import star from "../../assets/icons/mini-star.svg"
import Image from 'next/image'

const PerkCard = ({ title, description, image }) => {
    return (
        <div className='w-full h-full relative'>
            <div className="w-full h-full">
                <div className='h-[372px] max-w-[354.83px] bg-[#4935824D] border-[1px] border-gray-500 rounded-2xl p-5'>
                    <div className='w-full flex justify-between'>
                        <div className='w-[40px] h-[40px]'>
                            <Image src={star} alt='star' />
                        </div>
                        <div className='w-[40px] h-[40px]'>
                            <Image src={star} alt='star' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <h2 className='text-white text-[30px] font-normal text-center leading-[32px]'>{title}</h2>
                        <p className='text-white text-[16px] text-center leading-[21.6px]'>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerkCard