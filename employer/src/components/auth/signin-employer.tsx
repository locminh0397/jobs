import { useForm } from '@mantine/form';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Anchor, Button, CheckIcon, Group, Loader, PasswordInput, Stack, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { TypeEmployerSigninForm } from '../../../types';
import { employerSignin } from '../../../services/auth';

const cookies = new Cookies()


type Props = {
  setIsSignup: Dispatch<SetStateAction<boolean>>
}

function SigninEmployer({ setIsSignup }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const { reload } = useRouter()

  const form = useForm({
    initialValues: { user_name: '', password: '', },

    validate: {
      user_name: (value) => (value.length <= 0 ? 'Vui lòng nhập tên đăng nhập' : null),
      password: (val) => (val.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự!' : null),
    },
  });

  const handleSubmit = async (data: TypeEmployerSigninForm) => {
    setIsLoading(true)
    employerSignin(data).then((res) => {
      cookies.set('access_token', res.access_token, {
        maxAge: 60 * 60 * 24 * 7, path: "/",
      })
      reload()
    }).catch((err) => {
      notifications.show({
        title: "Lỗi!", message: "Tên đăng nhập hoặc mật khẩu không chính xác.", icon: <IconX />, styles: (theme) => ({

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
    <form onSubmit={form.onSubmit((values) => { handleSubmit(values) })}>
      <Stack>

        <TextInput
          label="Tên đang nhập"
          placeholder="Tên đăng nhâp"
          value={form.values.user_name}
          onChange={(event) => form.setFieldValue('user_name', event.currentTarget.value)}
          radius="md"
          error={form.errors.user_name}
        />


        <PasswordInput

          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          error={form.errors.password}
          radius="md"
        />

      </Stack>

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          className='text-black md:text-white'
          size="xs"
          onClick={() => setIsSignup(true)}
        >

          Chưa có tài khoản? Đăng ký

        </Anchor>
        <Button disabled={isLoading} variant='outline' type="submit" radius="xl">
          {isLoading && <Loader size="xs" mr={5} />} Đăng nhập
        </Button>
      </Group>
    </form>
  )
}


export default SigninEmployer