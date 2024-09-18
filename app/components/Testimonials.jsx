"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import Testimonial from './Cards/Testimonial'
import { testimonials } from '../utils/constants'

const Testimonials = (props) => {
    const { options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 3000 })
    ])
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        setIsPlaying(autoplay.isPlaying())
        emblaApi
            .on('autoplay:play', () => setIsPlaying(true))
            .on('autoplay:stop', () => setIsPlaying(false))
            .on('reInit', () => setIsPlaying(autoplay.isPlaying()))
    }, [emblaApi])

    return (
        <div className='w-full h-full'>
            <div className="w-full h-full flex flex-col gap-y-[6rem] mt-[5rem]">
                <div>
                    <h1 className='text-[60px] font-medium leading-[72px] text-center gradient-text'>{"Don't"} Trust Us, Trust <br />
                        <span>Their Voice</span>
                    </h1>
                </div>
                <div className="embla">
                    <div className="embla__viewport " ref={emblaRef}>
                        <div className="embla__container gap-x-5">
                            {testimonials.map((slide, index) => (
                                <div className={index === testimonials.length - 1 ? 'mr-5' : ''} key={index}>
                                    <Testimonial
                                        title={slide.title}
                                        name={slide.name}
                                        description={slide.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Testimonials
