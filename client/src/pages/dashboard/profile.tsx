import EditProfile from '@/components/dashboard/edit-profile'
import StudentLayout from '@/components/dashboard/student-layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { getAuth } from '../../../services/auth'
import Education from '@/components/dashboard/education'
import Experience from '@/components/dashboard/experience'
import Resume from '@/components/dashboard/upload-resume'
import { UploadAvatar } from '@/components/dashboard/upload-avatar'

function Profile({ user }: InferGetServerSidePropsType<GetServerSideProps>) {

  return (
    <StudentLayout user={user}>
      <UploadAvatar user={user} />
      <EditProfile user={user} />
      <Education />
      <Experience />
      <Resume user={user} />
    </StudentLayout>
  )
}

export default Profile


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