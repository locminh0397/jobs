
import Layout from '@/components/layout/layout'
import Background from '@/components/home/background'
import Featured from '@/components/home/featured'
import TopCompany from '@/components/home/top-company'
import Categories from '@/components/home/categories'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getAllJobs } from '../../services/job'

export default function Home({ jobs }: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <Layout>
      <Background />
      <div className='w-full overflow-hidden'>
        <TopCompany />
      </div>
      <Featured jobs={jobs} />
      <Categories />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await getAllJobs(18)
  return {
    props: {
      jobs
    }
  }
}