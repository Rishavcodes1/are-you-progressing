import React from 'react'

import logo from "@/../public/images/logo-transparent.png"
import Image from 'next/image'
import Link from 'next/link'
import RegsiterForm from '@/components/RegsiterForm'



const page = () => {
  return (
    <>
      <div className='flex flex-col mx-auto items-center w-[50%] p-3'>
        <div className='bg-gray-50 w-max p-5 rounded-[50%] border border-solid border-primary'>

          <Image src={logo} alt='' className=' w-[50px] aspect-square object-contain' />
          
        </div>
        <span className='text-2xl font-bold'>Register!</span>
        <span className='text-xs text-muted-foreground mt-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In odio sint consequatur hic fugit eius.</span>
      </div>
      <div className="p-3 w-[50%]  mx-auto mt-8">

        <RegsiterForm />
      </div>
      <p className='text-muted-foreground text-center mt-4'>Don't have an account? <Link href="/login" className='text-primary'>login</Link></p>
    </>
  )
}

export default page
