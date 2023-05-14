import React from 'react'
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {
  id?: string;
  title?: string
  industry?: string
  location?: string
  salary?: string
  job_type?: string
}

function CardJobRelated({ title,
  id,
  industry,
  location,
  salary,
  job_type, }: Props) {
  return (
    <Link href={`/jobs/${id}`} className='p-5 border flex gap-4 items-start justify-between rounded-md my-2 cursor-pointer'>

      <div className="content flex flex-col items-start">
        <h1 className='text-base lg:text-base font-semibold'>{title?.length! > 50 ? title?.slice(0, 50) + "..." : title}</h1>
        <div className='flex justify-between mt-1 text-sm text-gray-500 mb-2 flex-wrap'>
          {/* <h3 className='!text-sm mr-5 !text-gray-500 flex gap-2 items-center'><BriefcaseIcon width={20} /> {industry}</h3> */}
          <p className='flex gap-2 mr-5 items-center'><MapPinIcon width={20} /> {location}</p>
          <p className='flex gap-2 items-center'><CurrencyDollarIcon width={20} />{salary}</p>
        </div>
        {/* <p className='py-0.5 px-3 rounded-full mt-2 text-sm text-white bg-[#005247]'>{job_type}</p> */}
      </div>

    </Link>
  )
}

export default CardJobRelated