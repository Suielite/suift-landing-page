import React from 'react'
import bgCircle from '../assets/images/perks/bg-circle.png'
import bgHorizontalLine from '../assets/images/perks/bg-horizontal-line.png'
import bgVerticalLine from '../assets/images/perks/bg-vertical-line.png'
import Image from 'next/image'
import PerkCard from './Cards/PerkCard'
import { perks } from '../utils/constants'
import HeaderComponent from './HeaderComponent'

const Perks = () => {
    return (
        <section className='w-full h-full py-[3rem] '>
            <div className='w-full h-full'>
                <div className='px-5'>
                    <div className='md:hidden'>
                        <HeaderComponent title="Giving you the freedom to communicate on your own terms" />
                    </div>
                    <h1 className='hidden md:block text-[60px] font-medium leading-[72px] text-center gradient-text'>Giving you the freedom to <br />
                        <span>communicate on your own terms</span>
                    </h1>
                </div>

                <div className='mt-[2rem] w-full'>
                    <div className='w-full h-full relative'>
                        <div className='w-full flex justify-center relative'>
                            <div>
                                <Image src={bgCircle} className='w-[144.77px] h-[143.85px]' alt='bg-circle' />
                            </div>
                            <div className='absolute -z-10 top-[50%]'>
                                <Image src={bgHorizontalLine} className='w-[925.17px]' alt='bg-horizontal-line' />
                            </div>
                            <div className='absolute -z-10 top-[50%]'>
                                <Image src={bgVerticalLine} className='h-[462.5px] w-auto' alt='bg-horizontal-line' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='relative w-full flex justify-center'>
                    <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 px-5 md:px-0 justify-between md:w-[1255.17px] md:h-[24rem]">
                        <div className='w-full md:w-[30%] mt-16'>
                            <div className='md:absolute md:top-[27%]'>
                                <PerkCard
                                    title={perks[0].title}
                                    description={perks[0].description}
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-[30%]'>
                            <div className='md:absolute md:top-[100%]'>
                                <PerkCard
                                    title={perks[1].title}
                                    description={perks[1].description}
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-[28%]'>
                            <div className='md:absolute md:top-[27%]'>
                                <PerkCard
                                    title={perks[2].title}
                                    description={perks[2].description}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Perks