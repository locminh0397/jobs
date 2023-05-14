import { GetServerSideProps } from 'next'
import React from 'react'
import { getAuthEmployer } from '../../../services/auth'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button, CheckIcon, Checkbox, Loader, Select, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { TypeJobForm } from '../../../types'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { jobTypes } from '@/data/job-types'
import { industries } from '@/data/industry'
import { provinces } from '@/data/location'
import { createJobs } from '../../../services/jobs'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'


const Editor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Loader />,
})


function Dashboard() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<TypeJobForm>({
    initialValues: {
      title: "",
      from_salary: 0,
      to_salary: 0,
      hidden_salary: false,
      location: "",
      job_type: "",
      industry: "",
      requirements: "",
      description: ""
    },

    validate: {
      title: (value) => (value.length <= 0 ? 'Vui lòng nhập tên đăng nhập' : null),
      location: (value) => (value.length <= 0 ? 'Vui lòng chọn địa điểm làm việc' : null),
      job_type: (value) => (value.length <= 0 ? 'Vui lòng chọn loại hình công việc' : null),
      industry: (value) => (value.length <= 0 ? 'Vui lòng chọn ngành nghề' : null),
    },
  });



  const handleSubmit = (data: TypeJobForm) => {
    setIsLoading(true)
    createJobs(data).then((res) => {
      console.log("success")
      notifications.show({
        title: "Thành công!", message: "Đăng tin tuyển dụng thành công.", icon: <CheckIcon />, styles: (theme) => ({

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
      form.reset()
    }).catch((err) => {
      notifications.show({
        title: "Lỗi!", message: "Lỗi hệ thống! Vui lòng thử lại sau.", icon: <IconX />, styles: (theme) => ({

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
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Đăng tin tuyển dụng</title>
      </Head>
      <div className='p-4'>
        <h3 className='text-2xl font-semibold'>Đăng tin tuyển dụng</h3>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5'>
            <TextInput
              placeholder="Tiêu đề công việc"
              label="Tiêu đề"
              withAsterisk
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              error={form.errors.title}
            />

            <Select
              label="Địa điểm làm việc"
              placeholder="Chọn địa điểm làm việc"
              value={form.values.location}
              onChange={(event) => form.setFieldValue('location', event!)}
              error={form.errors.location}
              data={provinces}
            />

            <Select
              label="Loại hình công việc"
              placeholder="Chọn loại hình công việc"
              value={form.values.job_type}
              onChange={(event) => form.setFieldValue('job_type', event!)}
              error={form.errors.job_type}
              data={jobTypes}
            />

            <Select
              label="Ngành nghề"
              placeholder="Chọn ngành nghề"
              data={industries}
              value={form.values.industry}
              onChange={(event) => form.setFieldValue('industry', event!)}
              error={form.errors.industry}
            />

            <div className='flex flex-col gap-4'>
              <label className="font-semibold text-sm">Mức lương</label>
              <TextInput
                placeholder="Mức lương từ"
                label="Thấp nhất"
                withAsterisk
                value={form.values.from_salary}
                onChange={(event) => form.setFieldValue('from_salary', Number(event?.currentTarget?.value))}
                error={form.errors.from_salary}

              />
              <TextInput
                placeholder="Mức lương đến"
                label="Cao nhất"
                withAsterisk
                value={form.values.to_salary}
                onChange={(event) => form.setFieldValue('to_salary', Number(event?.currentTarget?.value))}
                error={form.errors.to_salary}

              />
              <Checkbox
                label="Ẩn mức lương"
                checked={form.values.hidden_salary}
                onChange={(event) => form.setFieldValue('hidden_salary', Boolean(event?.currentTarget?.checked))}
                error={form.errors.hidden_salary}
              />
            </div>

            <div>
              <div>
                <Text fz="sm" className='font-semibold mb-2'>Mô tả công việc <span className='text-red-400'>*</span></Text>
                <Editor theme="snow" value={form.values.description} onChange={(event: any) => form.setFieldValue('description', event)} />
              </div>

              <div>
                <Text fz="sm" className='font-semibold mb-2'>Yêu cầu công việc <span className='text-red-400'>*</span></Text>
                <Editor theme="snow" value={form.values.requirements} onChange={(event: any) => form.setFieldValue('requirements', event)} />
              </div>

            </div>

          </div>
          <div className='flex gap-4'>
            <Button disabled={isLoading} className='mt-5' variant='outline' type='submit'>{isLoading ? "Đăng tin..." : "Đăng tin"}</Button>
            <Button onClick={() => form.reset()} className='mt-5 border-gray-500 text-gray-500' variant='outline' type='button'>Hủy</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token
  if (token) {
    const user = await getAuthEmployer(token)
    if (!user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {

    }
  }
}
