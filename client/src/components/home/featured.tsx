import { Box, Title } from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'
import CardJob from '../card/card'
import { convertCurrency, findByValue } from '@/ultil'
import { industriesFind } from '@/data/datafind/industry'
import { jobTypesFind } from '@/data/datafind/job-types'
import { provincesFind } from '@/data/datafind/location'

type Props = {
  jobs: any[]
}

function Featured({ jobs }: Props) {

  const [loadCount, setLoadCount] = useState(9)

  return (
    <Box px={"md"} py="md" mt={20}>
      <div className='flex mb-5 justify-between items-center'>
        <Title className='text-[#005247] relative before:w-1/2 before:absolute before:h-1 before:bg-[#005247] before:-bottom-1' order={2}>
          Việc làm mới nhất
        </Title>
        <Link href="/jobs" className='text-blue-700 font-semibold hover:underline'>Tất cả việc làm</Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {jobs.slice(0, loadCount).map(item => (
          <CardJob id={item.id} key={item.id} title={item.title} industry={findByValue(item.industry, industriesFind)} location={findByValue(item.location, provincesFind)} salary={`${item.hidden_salary ? "Thỏa Thuận" : `${convertCurrency(item.from_salary)} - ${convertCurrency(item.to_salary)} VNĐ`}`} job_type={findByValue(item.job_type, jobTypesFind)} logo={item.company.logo_url} />
        ))}

      </div>
      {loadCount < jobs.length && (<button onClick={() => setLoadCount(loadCount + 9)} className="border px-5 py-2 bg-[#005247] text-white rounded-full block mx-auto mt-5">Tải thêm công việc</button>)}
    </Box>
  )
}

export default Featured