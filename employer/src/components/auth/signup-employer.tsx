import { Anchor, Button, CheckIcon, Group, Loader, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IconX } from '@tabler/icons-react';
import { TypeEmployerForm } from '../../../types';
import { employerSignup } from '../../../services/auth';

type Props = {
  setIsSignup: Dispatch<SetStateAction<boolean>>
}

function SignUpEmployerForm({ setIsSignup }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({

    initialValues: {
      user_name: '',
      name_company: '',
      email_company: '',
      password: '',
      confirm_password: ''
    },
    validate: {
      user_name: (value) => (value.length <= 0 ? 'Vui lòng nhập tên đăng nhập' : null),
      name_company: (value: any) => (value.length <= 0 ? 'Vui lòng nhập tên công ty' : null),
      email_company: (val: any) => (/^\S+@\S+$/.test(val) ? null : 'Email không hợp lệ!'),
      password: (val) => (val.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự!' : null),
      confirm_password: (value: any, values: any) =>
        value !== values.password ? 'Mật khẩu không khớp nhau!' : null,
    }
  });

  const handleSubmit = (data: TypeEmployerForm) => {

    setIsLoading(true)
    employerSignup(data).then((res) => {
      form.reset()
      notifications.show({
        title: "Thành công!", message: "Đăng ký tài khoản thành công.", icon: <CheckIcon />, styles: (theme) => ({

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
        title: "Lỗi!", message: "Tên đăng nhập này đã được sử dụng.", icon: <IconX />, styles: (theme) => ({

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


        <TextInput

          label="Email"
          placeholder="email@example.com"
          value={form.values.email_company}
          onChange={(event) => form.setFieldValue('email_company', event.currentTarget.value)}
          error={form.errors.email_company}
          radius="md"
        />

        <TextInput

          label="Tên công ty"
          placeholder="Tên công ty"
          value={form.values.name_company}
          onChange={(event) => form.setFieldValue('name_company', event.currentTarget.value)}
          error={form.errors.name_company}
          radius="md"
        />

        <PasswordInput

          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          error={form.errors.password}
          radius="md"
        />

        <PasswordInput

          label="Xác nhận mật khẩu"
          placeholder="Xác nhận mật khẩu"
          value={form.values.confirm_password}
          onChange={(event) => form.setFieldValue('confirm_password', event.currentTarget.value)}
          error={form.errors.confirm_password}
          radius="md"
        />


        <p className='text-sm text-center'>Bằng cách bấm nút đăng ký, Bạn đã đồng ý với điều khoản sử dụng và chính sách của chúng tôi</p>

      </Stack>

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          className='text-black md:text-white'
          size="xs"
          onClick={() => setIsSignup(false)}
        >

          Đã có tài khoản? Đăng nhập

        </Anchor>

        <Button disabled={isLoading} variant='outline' type="submit" radius="xl">
          {isLoading && <Loader size="xs" mr={5} />}  Đăng ký
        </Button>
      </Group>
    </form>

  )
}



export default SignUpEmployerForm