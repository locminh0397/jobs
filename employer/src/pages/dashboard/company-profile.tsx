import Layout from '@/components/layout/Layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { getAuthEmployer } from '../../../services/auth'
import { useForm } from '@mantine/form'
import { Button, CheckIcon, MultiSelect, TextInput, Textarea } from '@mantine/core'
import { IconEdit, IconX } from '@tabler/icons-react'
import { industries } from '@/data/industry'
import { editCompany } from '../../../services/company'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { UploadLogo } from '@/components/upload-logo'

function CompanyProfile({ user }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [edit, setEdit] = useState(true)
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { replace, asPath } = useRouter()
  const form = useForm({
    initialValues: {
      email_company: user.email_company,
      industry: user.industry,
      name_company: user.name_company,
      total_employee: user.total_employee,
      facebook_url: user.facebook_url,
      linkedin_url: user.linkedin_url,
      website_url: user.website_url,
      about: user.about,
      address: user.address,
    }
  })

  const handleSubmit = (data: any) => {
    setIsLoading(true)
    editCompany(data).then((res) => {
      console.log("success")
      notifications.show({
        title: "Thành công!", message: "Cập nhật hồ sơ công ty thành công.", icon: <CheckIcon />, styles: (theme) => ({

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
      replace(asPath)
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
        <title>Hồ sơ công ty</title>
      </Head>
      <div className='p-4'>
        <h3 className='text-2xl font-semibold flex justify-between items-center mb-4'>Hồ sơ công ty <IconEdit onClick={() => setEdit(false)} className='cursor-pointer' size={30} /> </h3>

        <div className="logo">
          <UploadLogo user={user} />
        </div>

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Textarea
            maxRows={5}
            disabled={edit}
            placeholder="Giới thiệu về công ty của bạn..."
            label="Giới thiệu"

            value={form.values.about}
            onChange={(event) => form.setFieldValue('about', event.currentTarget.value)}
            error={form.errors.about}
          />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <TextInput
              disabled={edit}
              placeholder="Nhập email"
              label="Email"

              value={form.values.email_company}
              onChange={(event) => form.setFieldValue('email_company', event.currentTarget.value)}
              error={form.errors.email_company}
            />
            <TextInput
              disabled={edit}
              placeholder="Nhập tên công ty"
              label="Tên công ty"

              value={form.values.name_company}
              onChange={(event) => form.setFieldValue('name_company', event.currentTarget.value)}
              error={form.errors.name_company}
            />
            <MultiSelect
              disabled={edit}
              data={industries}
              placeholder="Chọn ngành nghề"
              label="Ngành nghề kinh doanh"

              value={form.values.industry}
              onChange={(event) => form.setFieldValue('industry', event)}
              error={form.errors.industry}
            />
            <TextInput
              disabled={edit}
              placeholder="Nhập tổng số nhân viên"
              label="Quy mô"

              value={form.values.total_employee}
              onChange={(event) => form.setFieldValue('total_employee', event.currentTarget.value)}
              error={form.errors.total_employee}
            />
            <TextInput
              disabled={edit}
              placeholder="Đường dẫn facebook"
              label="Facebook"

              value={form.values.facebook_url}
              onChange={(event) => form.setFieldValue('facebook_url', event.currentTarget.value)}
              error={form.errors.facebook_url}
            />
            <TextInput
              disabled={edit}
              placeholder="Đường dẫn linkedin"
              label="Linkedin"

              value={form.values.linkedin_url}
              onChange={(event) => form.setFieldValue('linkedin_url', event.currentTarget.value)}
              error={form.errors.linkedin_url}
            />
            <TextInput
              disabled={edit}
              placeholder="Đường dẫn website"
              label="Website"

              value={form.values.website_url}
              onChange={(event) => form.setFieldValue('website_url', event.currentTarget.value)}
              error={form.errors.website_url}
            />
            <TextInput
              disabled={edit}
              placeholder="Địa chỉ công ty"
              label="Địa chỉ"

              value={form.values.address}
              onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
              error={form.errors.address}
            />
          </div>
          <div className='mt-4 flex gap-4'>
            <Button disabled={isLoading} variant='outline' className='' type='submit'>{isLoading ? "Cập nhật..." : "Cập nhật"}</Button>
            <Button onClick={() => setEdit(true)} variant='outline' className='border-gray-500 text-gray-500' type='button'>Hủy</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default CompanyProfile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token
  let user
  if (token) {
    user = await getAuthEmployer(token)
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
      user
    }
  }
}