import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Loader,
} from '@mantine/core';
import { Dispatch, SetStateAction, useState } from 'react';
import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import { getAuth, userSignin } from '../../../services/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

interface Props {
  setToggleLogin: Dispatch<SetStateAction<boolean>>
}

function LoginForm(props: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Vui lòng nhập email'),
      password: (val) => (val.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự' : null),
    },
  });

  const { reload, replace } = useRouter()

  const handleSignin = () => {
    setIsLoading(true)
    userSignin(form.values).then(res => {
      cookies.set('access_token', res.access_token, {
        maxAge: 60 * 60 * 24 * 7, path: "/",
      })
      reload()
    }).catch((err) => {
      notifications.show({
        title: "Lỗi!", message: "Email hoặc mật khẩu không chính xác.", icon: <IconX />, styles: (theme) => ({

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
      <div className='w-full relative flex justify-center h-[1000px] items-center'>
        <Paper className='w-full  bg-white md:bg-[#005247] md:text-white rounded-none md:w-[500px] md:h-auto md:rounded-md md:shadow-md' p="xl">
          <Text size="xl" weight={500} mb={'xl'}>
            Chào mừng quay lại, đăng nhập tại đây
          </Text>

          <form onSubmit={form.onSubmit(() => { handleSignin() })}>
            <Stack>


              <TextInput
                label="Email"
                placeholder="user@example.com"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Vui lòng nhập email'}
                radius="md"
              />

              <PasswordInput
                color='white'
                className='color-white'
                label="Mật khẩu"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Mật khẩu tối thiểu 6 ký tự'}
                radius="md"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component="button"
                type="button"
                className='text-black md:text-white font-semibold'
                size="sm"
                onClick={() => replace("/auth/signup")}
              >
                Chưa có tài khoản? Đăng ký
              </Anchor>
              <div className='flex gap-2'>
                <Button type="submit" variant='outline' radius="xl" >
                  {isLoading && <Loader mr={5} size="xs" />} Đăng nhập
                </Button>
              </div>
            </Group>
          </form>
        </Paper>
      </div>

    </Layout>
  );
}

export default LoginForm

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token
  if (token) {
    const user = await getAuth(token)
    if (user) {
      return {
        redirect: {
          destination: "/dashboard/profile",
          permanent: false,
        },
      }
    }
  }

  return {
    props: {

    }
  }
}