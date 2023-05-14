import Layout from '@/components/layout/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useEffect, useState } from 'react'
import { applyJob, isApplied, getJobByIndustry, jobDetail } from '../../../services/job'
import { convertCurrency, findByValue } from '@/ultil'
import { provincesFind } from '@/data/datafind/location'
import { jobTypesFind } from '@/data/datafind/job-types'
import { industriesFind } from '@/data/datafind/industry'
import { Button, CheckIcon, Divider, Tabs } from '@mantine/core'
import { IconBrandFacebook, IconBrandLinkedin, IconBuilding, IconFileDescription, IconWorld, IconX } from '@tabler/icons-react'
import parse from 'html-react-parser';
import CardJobRelated from '@/components/card/card-related'
import Image from 'next/image'
import Link from 'next/link'
import { getUser } from '../../../services/auth'
import { useRouter } from 'next/router'
import { notifications } from '@mantine/notifications'

function JobDetail({ job, related }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAppliedJob, setIsAppliedJob] = useState(false)
  const { replace } = useRouter()

  const handleApply = () => {
    setIsLoading(true)
    getUser().then((res) => applyJob(job.id).then((res) => {
      notifications.show({
        title: "Thành công!", message: "Ứng tuyển thành công.", icon: <CheckIcon />, styles: (theme) => ({

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
        title: "Lỗi!", message: "Email này đã được sử dụng.", icon: <IconX />, styles: (theme) => ({

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
    isApplied(job.id).then((res) => res.length > 0 ? setIsAppliedJob(true) : setIsAppliedJob(false)).catch((err) => console.log(err))
  }, [job, handleApply, isLoading])

  return (
    <Layout>
      <div className="p-4 min-h-[700px]">
        <div className="detail">
          <div className='head p-4'>
            <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>{job.title}</h1>
            <h2 className='text-base lg:text-xl font-semibold'>{job.company.name_company}</h2>
          </div>

          <div className='p-4 flex bg-gray-100 rounded-md'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 flex-1'>
              <div className="location flex gap-2 items-center">
                <h3 className='text-base lg:text-lg font-semibold'>Địa điểm làm việc:</h3>
                <p className='font-semibold text-gray-700 text-sm lg:text-base'>{findByValue(job.location, provincesFind)}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <h3 className='text-base lg:text-lg font-semibold'>Loại hình:</h3>
                <p className='font-semibold text-gray-700 text-sm lg:text-base'>{findByValue(job.job_type, jobTypesFind)}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <h3 className='text-base lg:text-lg font-semibold'>Ngành nghề:</h3>
                <p className='font-semibold text-gray-700 text-sm lg:text-base'>{findByValue(job.industry, industriesFind)}</p>
              </div >
              <div className='flex gap-2 items-center'>
                <h3 className='text-base lg:text-lg font-semibold'>Lương:</h3>
                <p className='font-semibold text-gray-700 text-sm lg:text-base'>{`${job.hidden_salary ? "Thỏa Thuận" : `${convertCurrency(job.from_salary)} - ${convertCurrency(job.to_salary)} VNĐ`}`}</p>
              </div>
            </div>
            {isAppliedJob ? (
              <Button disabled type='button' variant='outline'>Đã ứng tuyển</Button>
            ) : (<Button disabled={isLoading} onClick={handleApply} type='button' variant='outline'>{isLoading ? "Ứng tuyển..." : "Nộp đơn ứng tuyển"}</Button>)}

          </div>

          <div className='flex gap-4 mt-2 flex-col lg:flex-row'>
            <Tabs variant='outline' defaultValue="detail" className='pt-4 flex-1 shadow-md'>
              <Tabs.List>
                <Tabs.Tab value="detail" icon={<IconFileDescription size="0.8rem" />}>Chi tiết</Tabs.Tab>
                <Tabs.Tab value="company" icon={<IconBuilding size="0.8rem" />}>Công ty</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="detail" className='p-4' pt="xs">
                <div className='mb-4'>
                  <h3 className='text-xl md:text-2xl font-semibold'>Mô tả công việc</h3>
                  <div className='mt-2'>
                    {parse(job.description)}
                  </div>
                </div>

                <div className='mb-4'>
                  <h3 className='text-xl md:text-2xl font-semibold'>Yêu cầu công việc</h3>
                  <div className='mt-2'>
                    {parse(job.requirements)}
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="company" pt="xs" className='pb-4'>
                <div className='px-4'>
                  <h1 className='text-lg font-bold md:text-xl lg:text-2xl'>{job.company.name_company}</h1>

                  <div className='mt-4 flex gap-4 flex-col md:flex-row'>
                    <div className="logo bg-gray-100 w-[150px] h-[150px]">
                      <Image src={job.company.logo_url} alt={job.company.name_company} width={150} height={150} />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold'>Thông tin công ty</h3>
                      <Divider className='mb-2' />
                      <p><span className='font-semibold text-lg'>Địa chỉ:</span> <span className='text-base'>{job.company.address}</span> </p>
                      <p><span className='font-semibold text-lg'>Quy mô:</span> <span className='text-base'>{job.company.total_employee} nhân viên</span> </p>
                      <p><span className='font-semibold text-lg'>Website:</span> <span className='text-base'>{job.company.website_url}</span> </p>

                      <div className='flex items-center gap-2'>
                        <Link href={job.company.facebook_url}><IconBrandFacebook size={30} color='#4267B2' /></Link>
                        <Link href={job.company.linkedin_url}><IconBrandLinkedin size={30} color='#0A66C2' /> </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Panel>
            </Tabs>

            <div className='w-full lg:w-[400px]  shadow-md'>
              <h3 className='text-xl font-semibold py-3 px-4'>Công việc liên quan</h3>
              <Divider />
              <div className='px-2'>{
                related.map((item: any) => (
                  <CardJobRelated id={item.id} key={item.id} title={item.title} location={findByValue(item.location, provincesFind)} salary={`${item.hidden_salary ? "Thỏa Thuận" : `${convertCurrency(item.from_salary)} - ${convertCurrency(item.to_salary)} VNĐ`}`} job_type={findByValue(item.job_type, jobTypesFind)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default JobDetail

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const job = await jobDetail(params?.slug as string)
  const related = await getJobByIndustry(job.industry, params?.slug as string)

  return {
    props: {
      job,
      related
    }
  }
}