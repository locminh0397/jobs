import React, { useEffect, useState } from 'react'
import { BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { getUser } from '../../../services/auth'
import { isSaved, saveJob } from '../../../services/job'
import { notifications } from '@mantine/notifications'
import { CheckIcon } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/router'

type Props = {
  id?: string;
  title?: string
  logo?: string
  industry?: string
  location?: string
  salary?: string
  job_type?: string
}

function CardJob({ title,
  id,
  logo,
  industry,
  location,
  salary,
  job_type, }: Props) {
  const [isSaveJob, setIsSaveJob] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { replace } = useRouter()

  const handleSave = () => {
    setIsLoading(true)
    getUser().then((res) => saveJob(id!).then((res) => {
      notifications.show({
        title: "Thành công!", message: "Lưu việc làm thành công.", icon: <CheckIcon />, styles: (theme) => ({

          root: {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.green[6],
            borderWidth: 1,

            // '&::before': { backgroundColor: theme.white },
          },
          icon: { backgroundColor: theme.colors.green },
          title: { color: theme.colors.green },
          description: { color: theme.colors.green },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.green[7] },
          },
        }),
      })
    }).catch((err) => {
      notifications.show({
        title: "Lỗi!", message: "Lỗi hệ thống.", icon: <IconX />, styles: (theme) => ({

          root: {
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.red[6],
            borderWidth: 1,

            // '&::before': { backgroundColor: theme.white },
          },
          icon: { backgroundColor: theme.colors.red },
          title: { color: theme.colors.red },
          description: { color: theme.colors.red },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      })
    }).finally(() => setIsLoading(false))

    ).catch(err => replace("/auth/signin"))
  }

  useEffect(() => {
    isSaved(id!).then((res) => res.length > 0 ? setIsSaveJob(true) : setIsSaveJob(false)).catch((err) => console.log(err))
  }, [handleSave, isLoading])


  return (
    <div className='p-5 border flex gap-4 items-start rounded-md hover:shadow-md cursor-pointer'>
      <div className="logo w-[100px] h-[100px] relative">
        <Image src={logo!} alt='logo' fill />
      </div>

      <div className="content flex flex-col items-start">
        <Link href={`/jobs/${id}`}><h1 className='text-base lg:text-lg font-semibold'>{title?.length! > 50 ? title?.slice(0, 50) + "..." : title}</h1></Link>
        <div className='flex justify-between mt-1 text-sm text-gray-500 mb-2 flex-wrap'>
          <h3 className='!text-sm mr-5 !text-gray-500 flex gap-2 items-center'><BriefcaseIcon width={20} /> {industry}</h3>
          <p className='flex gap-2 mr-5 items-center'><MapPinIcon width={20} /> {location}</p>
          <p className='flex gap-2 items-center'><CurrencyDollarIcon width={20} />{salary}</p>
        </div>
        <p className='py-0.5 px-3 rounded-full mt-2 text-sm text-white bg-[#005247]'>{job_type}</p>
      </div>

      <button disabled={isSaveJob} type='button' onClick={handleSave} className='w-[40px] h-[40px] ml-auto hover:bg-gray-200 flex justify-center items-center p-0.5'>
        <BookmarkIcon className='' width={25} />
      </button>
    </div>
  )
}

export default CardJob