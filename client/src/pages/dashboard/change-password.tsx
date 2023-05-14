import StudentLayout from '@/components/dashboard/student-layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { useState } from 'react'
import { getAuth } from '../../../services/auth'
import { IconLock, IconX } from '@tabler/icons-react'
import { Button, CheckIcon, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { TypePasswords } from '../../../type'
import { notifications } from '@mantine/notifications'
import { changePassword } from '../../../services/student'

function ChangePassword({ user }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TypePasswords>({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_password: ''
    },

    validate: {
      old_password: (value) => (value.length <= 0 ? 'Vui lòng nhập mật khẩu cũ' : null),
      new_password: (val) => (val.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự!' : null),
      confirm_password: (value, values) =>
        value !== values.new_password ? 'Mật khẩu không khớp nhau!' : null,
    },
  });

  const handleChangePassword = (dataForm: TypePasswords) => {
    setIsLoading(true)
    changePassword(dataForm).then((res) => {
      notifications.show({
        title: "Thành công!", message: "Đã cập nhật.", icon: <CheckIcon />, styles: (theme) => ({

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
    }
    ).catch(err =>
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
    ).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <StudentLayout user={user}>
      <div className=' bg-white profile mt-4 shadow-md py-2'>
        <div className='flex px-4 py-4 gap-2 items-center'>
          <IconLock size={30} className='text-[#005247]' />
          <h1 className="flex text-[#005247] text-xl font-bold items-center gap-2 justify-between">Đổi mật khẩu</h1>
        </div>

        <div className='w-full flex justify-center'>
          <form onSubmit={form.onSubmit((values) => handleChangePassword(values))} className='w-full md:w-[500px] px-4 pb-4'>

            <div className='w-full flex flex-col gap-4'>
              <PasswordInput
                withAsterisk
                label="Mật khẩu cũ"
                placeholder="Mật khẩu cũ"
                id="old-password"
                value={form.values.old_password}
                onChange={(event) => form.setFieldValue('old_password', event.currentTarget.value)}
                error={form.errors.old_password}
              />
              <PasswordInput
                value={form.values.new_password}
                onChange={(event) => form.setFieldValue('new_password', event.currentTarget.value)}
                error={form.errors.new_password}
                withAsterisk label="Mật khẩu mới" placeholder="Mật khẩu mới" id="new-password" />
              <PasswordInput
                value={form.values.confirm_password}
                onChange={(event) => form.setFieldValue('confirm_password', event.currentTarget.value)}
                error={form.errors.confirm_password}
                withAsterisk label="Xác nhận mật khẩu mới" placeholder="Xác nhận mật khẩu mới" id="confirm-new-password" />
            </div>

            <Button disabled={isLoading} className='mt-4' type='submit' variant='outline'>{isLoading ? "Đang lưu thay đổi..." : "Đổi mật khẩu"}</Button>
          </form>
        </div>
      </div>
    </StudentLayout>
  )
}

export default ChangePassword

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