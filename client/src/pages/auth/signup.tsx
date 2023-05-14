import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Loader,
  CheckIcon,
} from '@mantine/core';
import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';
import { userSignup } from '../../../services/auth';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';

import { notifications } from '@mantine/notifications';

export default function AuthenticationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm({
    initialValues: {
      email: '',
      full_name: '',
      password: '',
      confirm_password: ''
    },

    validate: {
      full_name: (value) => (value.length <= 0 ? 'Vui lòng nhập họ tên' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Email không hợp lệ!'),
      password: (val) => (val.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự!' : null),
      confirm_password: (value, values) =>
        value !== values.password ? 'Mật khẩu không khớp nhau!' : null,
    },
  });

  const { push } = useRouter()

  const handleSubmit = () => {
    setIsLoading(true)
    userSignup(form.values).then((res) => {
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

  }
  return (
    <Layout>
      <div className='w-full relative flex justify-center h-[800px] items-center'>
        <Paper className='w-full  bg-white md:bg-[#005247] md:text-white rounded-none md:w-[500px] md:h-auto md:rounded-md md:shadow-md' p="xl">
          <Text size="xl" weight={500} mb={'xl'}>
            Chào mừng, đăng ký tài khoản tại đây
          </Text>

          <form onSubmit={form.onSubmit(() => { handleSubmit() })}>
            <Stack>

              <TextInput
                label="Họ tên"
                placeholder="Họ tên"
                value={form.values.full_name}
                onChange={(event) => form.setFieldValue('full_name', event.currentTarget.value)}
                radius="md"
                error={form.errors.full_name}
              />


              <TextInput

                label="Email"
                placeholder="email@example.com"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email}
                radius="md"
              />

              <PasswordInput
                autoComplete=""
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password}
                radius="md"
              />
              <PasswordInput
                autoComplete=""
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
                onClick={() => push("/auth/signin")}
              >

                Đã có tài khoản? Đăng nhập

              </Anchor>
              <Button disabled={isLoading} variant='outline' type="submit" radius="xl">
                {isLoading && <Loader size="xs" mr={5} />} Đăng ký
              </Button>
            </Group>
          </form>
        </Paper>
      </div>

    </Layout>
  );

}