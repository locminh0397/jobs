import DashboardLayout from '@/components/layout/DashboardLayout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { deleteJob, findByTitle, getJobs } from '../../../services/jobs'
import { Button, CheckIcon, Modal, Table, Text, TextInput } from '@mantine/core'
import { findByValue } from '@/ultils'
import { provinces } from '@/data/location'
import { industries } from '@/data/industry'
import { jobTypes } from '@/data/job-types'
import { IconPencil, IconTrash, IconX } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import EditJob from '@/components/edit-job'
import { notifications } from '@mantine/notifications'
import { modals } from '@mantine/modals';
import { useRouter } from 'next/router'
import { useDebounce } from 'usehooks-ts'


function AllJobs({ jobs }: InferGetServerSidePropsType<GetServerSideProps>) {
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState(null)
  const [id, setId] = useState("")
  const [search, setSearch] = useState('');
  const { reload } = useRouter()
  const [searchData, setSearchData] = useState<any[]>()

  const debouncedValue = useDebounce<string>(search, 500)

  const handleDelete = (id: string) => {
    deleteJob(id).then((res) => {
      notifications.show({
        title: "Thành công!", message: "Đã xóa.", icon: <CheckIcon />, styles: (theme) => ({

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
    }).catch(err =>
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
      reload()
    })
  }


  const openModal = (id: string) => modals.openConfirmModal({
    title: 'Cảnh báo!',
    centered: true,
    children: (
      <Text size="sm">
        Bạn có chắc chắn muốn xóa dữ liệu này.
      </Text>
    ),
    confirmProps: { color: 'red', variant: "filled", },
    labels: { confirm: 'Xóa', cancel: 'Hủy' },
    onCancel: () => console.log('Cancel'),
    onConfirm: async () => await handleDelete(id),
  });

  useEffect(() => {
    findByTitle(debouncedValue).then((res) => setSearchData(res)).catch(err => console.log(err));
  }, [debouncedValue])

  useEffect(() => {
    const data = jobs.find((item: any) => item.id === id)
    setEdit(data)
  }, [id])

  return (
    <DashboardLayout>
      <Head>
        <title>Tất cả tin tuyển dụng</title>
      </Head>
      <div className="p-4">
        <h3 className='text-2xl font-semibold'>Tất cả tin tuyển dụng</h3>
        <Modal opened={opened} onClose={close} title="Chỉnh sửa tin tuyển dụng" size="90%" centered>
          <EditJob editData={edit} close={close} />
        </Modal>
        <TextInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nhập tiêu đề tìm kiếm..."
          label="Tìm kiếm" />
        <Table withBorder mt={10} striped highlightOnHover withColumnBorders>
          <thead>
            <tr className='!text-center' >
              <th className='!text-center'>STT</th>
              <th className='!text-center'>Tiêu đề</th>
              <th className='!text-center'>Địa điểm làm việc</th>
              <th className='!text-center'>Ngành nghề</th>
              <th className='!text-center'>Loại hình</th>
              <th className='!text-center w-[200px]'>Hành động</th>
            </tr>
          </thead>
          <tbody className='text-center'>{searchData?.length! > 0 ? searchData?.map((element: any, index: number) => (
            <tr key={element.id} >
              <td>{index + 1}</td>
              <td>{element.title}</td>
              <td>{findByValue(element.location, provinces)}</td>
              <td>{findByValue(element.industry, industries)}</td>
              <td>{findByValue(element.job_type, jobTypes)}</td>
              <td className='flex justify-center w-[200px]'>
                <Button onClick={() => openModal(element.id)} className='text-red-500'>
                  <IconTrash />
                </Button>
                <Button onClick={() => {
                  open()
                  setId(element.id)
                }} className='text-green-500'>
                  <IconPencil />
                </Button>
              </td>
            </tr>
          )) : jobs.map((element: any, index: number) => (
            <tr key={element.id} >
              <td>{index + 1}</td>
              <td>{element.title}</td>
              <td>{findByValue(element.location, provinces)}</td>
              <td>{findByValue(element.industry, industries)}</td>
              <td>{findByValue(element.job_type, jobTypes)}</td>
              <td className='flex justify-center w-[200px]'>
                <Button onClick={() => openModal(element.id)} className='text-red-500'>
                  <IconTrash />
                </Button>
                <Button onClick={() => {
                  open()
                  setId(element.id)
                }} className='text-green-500'>
                  <IconPencil />
                </Button>
              </td>
            </tr>
          ))}</tbody>
        </Table>
      </div>
    </DashboardLayout>
  )
}

export default AllJobs

export const getServerSideProps: GetServerSideProps = async () => {
  const jobs = await getJobs()
  return {
    props: {
      jobs
    }
  }
}