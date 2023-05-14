import Layout from '@/components/layout/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { getAllJobs, getJobByIndustryWithoutId, searchJob } from '../../../services/job'
import CardJob from '@/components/card/card'
import { provincesFind } from '@/data/datafind/location'
import { industriesFind } from '@/data/datafind/industry'
import { jobTypesFind } from '@/data/datafind/job-types'
import { convertCurrency, findByValue } from '@/ultil'
import { Select } from '@mantine/core'

function Job({ jobs }: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <Layout>
      <div className='p-4 flex flex-col gap-4'>
        <div className="filter rounded-md p-2">
          <div className='!text-black flex gap-4'>
            <Select
              label="Hình thức làm việc"
              placeholder="Chọn hình thức"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
            <Select
              label="Địa điểm"
              placeholder="Chọn địa điểm"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
            <Select
              label="Ngành nghề"
              placeholder="Chọn ngành nghề"
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {jobs.map((item: any) => (
            <CardJob id={item.id} key={item.id} title={item.title} industry={findByValue(item.industry, industriesFind)} location={findByValue(item.location, provincesFind)} salary={`${item.hidden_salary ? "Thỏa Thuận" : `${convertCurrency(item.from_salary)} - ${convertCurrency(item.to_salary)} VNĐ`}`} job_type={findByValue(item.job_type, jobTypesFind)} logo={item.company.logo_url} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Job

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let jobs
  if (query.industry) {
    jobs = await getJobByIndustryWithoutId(query?.industry as string)
  }
  else if (query.title && query.location) {
    jobs = await searchJob(query?.title as string, query.location as string)
  }
  else (
    jobs = await getAllJobs()
  )
  console.log(jobs)
  return {
    props: {
      jobs
    }
  }
}