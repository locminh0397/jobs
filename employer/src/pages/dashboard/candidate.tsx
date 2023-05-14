import DashboardLayout from '@/components/layout/DashboardLayout'
import { Loader, Table } from '@mantine/core'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { getAppliedForCompany } from '../../../services/jobs'
import Link from 'next/link'
import { downloadResume } from '../../../services/company'
import { IconDownload } from '@tabler/icons-react'

type TypeApplied = {
  applications: [
    { id: string, user: any, job: any }
  ]
}

function Candidate() {
  const [isLoading, setIsLoading] = useState(false)
  const [applied, setApplied] = useState<TypeApplied[]>()

  const fetchedData = async () => {
    const fetched = await getAppliedForCompany()
    setApplied(fetched)
  }

  useEffect(() => {
    fetchedData()
  }, [])
  console.log(applied?.map(item => item.applications.map(apply => console.log(apply))))
  return (
    <DashboardLayout>
      <Head>
        <title>Ứng viên</title>
      </Head>
      {isLoading ? <Loader /> : (
        <div className='p-4'>
          <h3 className='text-2xl font-semibold mb-4'>Ứng viên đã ứng tuyển</h3>

          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr className='!text-center' >
                {/* <th className='!text-center'>STT</th> */}
                <th className='!text-center'>Tiêu đề</th>
                <th className='!text-center'>Lương tối thiểu</th>
                <th className='!text-center'>Lương tối đa</th>
                <th className='!text-center'>Họ tên</th>
                <th className='!text-center'>Email</th>
                <th className='!text-center'>Điện thoại</th>
                <th className='!text-center'>Tải CV</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                applied?.map(item => item.applications.map(apply =>
                (
                  <tr key={apply?.id} >
                    {/* <td>{index + 1}</td> */}
                    <td>{apply?.job.title}</td>
                    <td>{apply?.job.from_salary}</td>
                    <td>{apply?.job.to_salary}</td>
                    <td>{apply?.user.full_name}</td>
                    <td>{apply?.user.email}</td>
                    <td>{apply?.user.phone}</td>
                    <td>
                      <button className='text-blue-700' onClick={async () => await downloadResume(apply?.user.resume, apply?.user.id)} type='button'><IconDownload /></button>
                    </td>
                  </tr>
                )))
              }
              {/* {
                applied?.map((element: any, index: number) => (
                  <tr key={element?.id} >
                    <td>{index + 1}</td>
                    <td>{element?.job.title}</td>
                    <td>{ }</td>
                    <td className='font-semibold text-gray-700'>
                      <Link className="inline-block text-blue-700" href={`/jobs/${element.id}`}>
                        <IconEye />
                      </Link>
                    </td>
                  </tr>
                ))
              } */}
            </tbody>
          </Table>
        </div>
      )}
    </DashboardLayout>
  )
}

export default Candidate
