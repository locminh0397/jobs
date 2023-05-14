import SigninEmployer from "@/components/auth/signin-employer"
import SignUpEmployerForm from "@/components/auth/signup-employer"
import { Paper, Text } from "@mantine/core"
import { GetServerSideProps } from "next"
import { useState } from "react"
import { getAuthEmployer } from "../../services/auth"
import Layout from "@/components/layout/Layout"
import Head from "next/head"



function Employer() {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <Layout>
      <Head>
        <title>{isSignup ? "Đăng ký" : "Đăng nhập"}</title>
      </Head>
      <div className='w-full relative'>
        <Paper className='w-full h-full bg-white md:bg-[#005247] md:text-white md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-none md:w-[500px] md:h-auto md:rounded-md md:shadow-md' p="xl">
          <Text size="xl" weight={500} mb={'xl'}>
            {isSignup ? "Chào mừng, đăng ký tài khoản cho nhà tuyển dụng" : "Chào mừng, đăng nhập tài khoản cho nhà tuyển dụng"}
          </Text>

          {
            isSignup ? (
              <SignUpEmployerForm setIsSignup={setIsSignup} />
            ) : (
              <SigninEmployer setIsSignup={setIsSignup} />
            )
          }

        </Paper>
      </div>
    </Layout>
  )
}

export default Employer

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token
  if (token) {
    const user = await getAuthEmployer(token)

    if (user) {
      return {
        redirect: {
          destination: "/dashboard/post-job",
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
