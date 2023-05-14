import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <div>
      <nav className='bg-[#005247] p-4 flex justify-between '>
        <Link href={"#"} className='text-xl select-none lg:text-2xl italic font-bold text-blue-500'>Intern Jobs</Link>
        <div className='flex gap-10 items-center'>
          <Link target='_blank' className='text-white' href="http://localhost:3000">Tìm việc làm?</Link>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default Layout