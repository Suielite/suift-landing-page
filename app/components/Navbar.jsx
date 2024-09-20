import React from 'react'
import { navLinks } from '../utils/constants'
import logo from "../assets/images/logo.svg"
import star from "../assets/images/star.svg"
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
    return (
        <div className='w-full h-full bg-transparent'>
            <div className="w-full h-full bg-inherit flex justify-between items-center px-10 py-4 border-b-[1px] border-gray-700">
                <div>
                    <div className='w-[100px] md:w-[116px] h-[41px] md:h-[51px]'>
                        <Image src={logo} className='w-full h-full' alt='logo' />
                    </div>
                </div>
                <div className='hidden md:flex justify-center gap-x-5 w-1/3'>
                    {
                        navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.link}
                                className='text-white'
                            >
                                {link.name}
                            </Link>
                        ))
                    }
                </div>
                <div className='hidden md:flex'>
                    <div className='bg-gradient-to-r from-[#472F8C66] to-[#8A2C8F]  flex gap-x-2 px-3 py-2 rounded-full'>
                        <Image src={star} className='w-[20px] h-[20px]' alt='star' />
                        <button className='capitalize text-white'>Get Early Access</button>
                    </div>
                </div>

                <div className='md:hidden'>
                    <Sheet>
                        <div>
                            <SheetTrigger asChild>
                                <Menu />
                            </SheetTrigger>
                        </div>

                        <SheetContent className='bg-white'>
                            <SheetHeader>
                                <SheetTitle>
                                    <span className='text-[#472F8C66]'>
                                        Suift
                                    </span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                {
                                    navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.link}
                                            className='text-black'
                                        >
                                            {link.name}
                                        </Link>
                                    ))
                                }
                                <div className=''>
                                    <div className='bg-gradient-to-r from-[#472F8C66] to-[#8A2C8F]  flex gap-x-2 px-3 py-2 rounded-full'>
                                        <Image src={star} className='w-[20px] h-[20px]' alt='star' />
                                        <button className='capitalize text-white'>Get Early Access</button>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    )
}

export default Navbar