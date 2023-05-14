import Link from 'next/link'
import React, { ReactNode } from 'react'
import { IconType } from 'react-icons/lib'

type Props = {
  title: string
  industry: string
}

function CardCategory({ title, industry }: Props) {
  return (
    <Link href={`/jobs/?industry=${industry}`} className='bg-gray-200 p-4'>
      <h1 className='text-sm font-semibold'>{title}</h1>
    </Link>
  )
}

export default CardCategory