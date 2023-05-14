import Link from 'next/link'
import React from 'react'
import { NavbarSimple } from './sidebar'
import { useDisclosure } from '@mantine/hooks'
import { Burger } from '@mantine/core';

type Props = {
  children: React.ReactNode
}


function DashboardLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';
  return (
    <div>
      <nav className='bg-[#005247] h-[50px] px-4 flex justify-between items-center'>
        <Burger opened={opened} onClick={toggle} aria-label={label} color="white" />;
        <div className='flex gap-10 items-center'>
          <Link target='_blank' className='text-white' href="http://localhost:3000">Tìm việc làm?</Link>
        </div>
      </nav>
      <div>
        <div className={`${opened ? "w-[300px] block" : "w-0 hidden"} transition-all ease-in-out duration-300`}>
          <NavbarSimple />
        </div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout