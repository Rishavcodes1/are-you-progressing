"use client"
import React, { useEffect, useRef } from 'react'

import crunches from "@/../public/images/crunches.png"
import fitnessApp from "@/../public/images/fitness-app.png"
import ridingBicycle from "@/../public/images/riding-bicycle.png"
import stretching from "@/../public/images/stretching.png"
import workout from "@/../public/images/workout.png"
import logoReversedWithText from "@/../public/images/logo-reversed-with-text.png"
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"



export function ImageCarousel() {

    const autoplayPlugin = useRef(Autoplay({ delay: 1300, stopOnLastSnap: true }))

    const imageArray = [crunches, stretching, ridingBicycle, workout, fitnessApp, logoReversedWithText]


    return (

        <>


            <Carousel
                className="w-full max-w-[480px]"
                opts={{ loop: true }}
                plugins={[autoplayPlugin.current]}>
                <CarouselContent>
                    {
                        imageArray.map((imagePath, index) => (
                            <CarouselItem key={index}>
                                <Image src={imagePath} alt='' />
                            </CarouselItem>
                        ))
                    }

                </CarouselContent>

            </Carousel>
        </>
    )
}

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='w-screen min-h-screen flex'>
            <div className='w-1/2 bg-primary flex'>
                <div className=' m-auto'>

                    {/* <Image src={crunches} alt='' className='w-[500px]' /> */}
                    <ImageCarousel />
                </div>
            </div>
            <div className='w-1/2 flex flex-col justify-center p-8'>

                {children}
            </div>
        </div>
    )
}

export default layout
