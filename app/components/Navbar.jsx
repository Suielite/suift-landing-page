import React from 'react'
import { navLinks } from '../utils/constants'
import logo from "../assets/images/logo.svg"
import star from "../assets/images/star.svg"
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='w-full h-full bg-transparent'>
            <div className="w-full h-full bg-inherit flex justify-between items-center px-10 py-4 border-b-[1px] border-gray-700">
                <div>
                    <div className='w-[116px] h-[51px]'>
                        <Image src={logo} className='w-full h-full' alt='logo' />
                    </div>
                </div>
                <div className='flex justify-center gap-x-5 w-1/3'>
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
                <div>
                    <div className='bg-gradient-to-r from-[#472F8C66] to-[#8A2C8F]  flex gap-x-2 px-3 py-2 rounded-full'>
                        <Image src={star} className='w-[20px] h-[20px]' alt='star' />
                        <button className='capitalize text-white'>Get Early Access</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar