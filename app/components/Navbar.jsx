import React from 'react'
import { navLinks } from '../utils/constants'
import logo from "@/app/assets/images/logo.svg"
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='w-full h-full bg-transparent'>
            <div className="w-full h-full bg-inherit flex justify-between">
                <div>
                    <Image src={logo} alt='logo' />
                </div>
                <div className='flex gap-x-3'>
                    {
                        navLinks.map((link) => {
                            <Link href={link.link} className='text-white'>
                                {link.name}
                            </Link>
                        })
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Navbar