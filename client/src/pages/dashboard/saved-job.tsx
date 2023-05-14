import StudentLayout from '@/components/dashboard/student-layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { getAuth } from '../../../services/auth'
import { getSavedByStudent } from '../../../services/job'
import { Loader, Table } from '@mantine/core'
import { IconBookmark, IconEye } from '@tabler/icons-react'
import { findByValue } from '@/ultil'
import { provincesFind } from '@/data/datafind/location'
import { industriesFind } from '@/data/datafind/industry'
import { jobTypesFind } from '@/data/datafind/job-types'
import Link from 'next/link'

function SaveJob({ user }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [save, setSave] = useState<any[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getSavedByStudent().then(res => setSave(res)).catch(err => console.log(err)).finally(() => setIsLoading(false))
  }, [])

  return (
    <StudentLayout user={user}>
      {isLoading ? <Loader className='mx-auto' /> : (
        <div>
          <div className='flex px-4 py-4 gap-2 items-center'>
            <IconBookmark size={30} className='text-[#005247]' />
            <h1 className="flex text-[#005247] text-xl font-bold items-center gap-2 justify-between">Việc làm đã lưu</h1>
          </div>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr className='!text-center' >
                <th className='!text-center'>STT</th>
                <th className='!text-center'>Tiêu đề</th>
                <th className='!text-center'>Địa điểm làm việc</th>
                <th className='!text-center'>Ngành nghề</th>
                <th className='!text-center'>Loại hình</th>
                <th className='!text-center'>Hành động</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                save?.map((element: any, index: number) => (
                  <tr key={element.job.id} >
                    <td>{index + 1}</td>
                    <td>{element.job.title}</td>
                    <td>{findByValue(element.job.location, provincesFind)}</td>
                    <td>{findByValue(element.job.industry, industriesFind)}</td>
                    <td>{findByValue(element.job.job_type, jobTypesFind)}</td>
                    <td className='font-semibold text-gray-700'>
                      <Link className="inline-block text-blue-700" href={`/jobs/${element.id}`}>
                        <IconEye />
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      )}
    </StudentLayout>
  )
}

export default SaveJob

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token
  let user
  if (token) {
    user = await getAuth(token)
    if (!user) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      }
    }
  }
  if (!token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }
  return {
    props: {
      user: user ? user : "Error"
    }
  }
}