import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Box, Burger } from '@mantine/core';
import Sidebar from './sidebar'
import { TypeUser } from '../../../type';

type Props = {
  children: React.ReactNode
  user: TypeUser
}

function StudentLayout({ children, user }: Props) {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';
  return (
    <div className='w-full'>
      <Box className='w-full flex justify-between items-center py-4 shadow-md bg-[#005247]' px={"md"}>
        <h1 className='!p-0 font-bold text-white italic'>Intern Job</h1>
        <Burger opened={opened} onClick={toggle} color='white' aria-label={label} />
      </Box>
      <div>
        <Sidebar user={user} opened={opened} />
        <div className='bg-gray-50 h-full w-full p-4'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default StudentLayout