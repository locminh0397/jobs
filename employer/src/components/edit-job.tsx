
import React from 'react'
import { Button, CheckIcon, Checkbox, Loader, Select, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { jobTypes } from '@/data/job-types'
import { industries } from '@/data/industry'
import { provinces } from '@/data/location'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { TypeJobEditForm } from '../../types';
import { editJobs } from '../../services/jobs';
import { useRouter } from 'next/router';

const Editor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Loader />,
})

type Props = {
  editData: any
  close: () => void
}

function EditJob({ editData, close }: Props) {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { reload } = useRouter()

  const form = useForm<TypeJobEditForm>({
    initialValues: {
      title: editData?.title,
      from_salary: editData?.from_salary,
      to_salary: editData?.to_salary,
      hidden_salary: editData?.hidden_salary,
      location: editData?.location,
      job_type: editData?.job_type,
      industry: editData?.industry,
      requirements: editData?.requirements,
      description: editData?.description
    },

  });

  const handleSubmit = (data: TypeJobEditForm) => {
    setIsLoading(true)
    editJobs(data, editData.id).then((res) => {
      notifications.show({
        title: "Thành công!", message: "Cập nhật tin tuyển dụng thành công.", icon: <CheckIcon />, styles: (theme) => ({

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
      close
      form.reset()
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
    }).finally(() => {
      setIsLoading(false)
      reload()
    })
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5'>
        <TextInput
          placeholder="Tiêu đề công việc"
          label="Tiêu đề"
          withAsterisk
          value={form.values.title}
          onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
          error={form.errors.title}
        />

        <Select
          label="Địa điểm làm việc"
          placeholder="Chọn địa điểm làm việc"
          value={form.values.location}
          onChange={(event) => form.setFieldValue('location', event!)}
          error={form.errors.location}
          data={provinces}
        />

        <Select
          label="Loại hình công việc"
          placeholder="Chọn loại hình công việc"
          value={form.values.job_type}
          onChange={(event) => form.setFieldValue('job_type', event!)}
          error={form.errors.job_type}
          data={jobTypes}
        />

        <Select
          label="Ngành nghề"
          placeholder="Chọn ngành nghề"
          data={industries}
          value={form.values.industry}
          onChange={(event) => form.setFieldValue('industry', event!)}
          error={form.errors.industry}
        />

        <div className='flex flex-col gap-4'>
          <label className="font-semibold text-sm">Mức lương</label>
          <TextInput
            placeholder="Mức lương từ"
            label="Thấp nhất"
            withAsterisk
            value={form.values.from_salary}
            onChange={(event) => form.setFieldValue('from_salary', Number(event?.currentTarget?.value))}
            error={form.errors.from_salary}

          />
          <TextInput
            placeholder="Mức lương đến"
            label="Cao nhất"
            withAsterisk
            value={form.values.to_salary}
            onChange={(event) => form.setFieldValue('to_salary', Number(event?.currentTarget?.value))}
            error={form.errors.to_salary}

          />
          <Checkbox
            label="Ẩn mức lương"
            checked={form.values.hidden_salary}
            onChange={(event) => form.setFieldValue('hidden_salary', Boolean(event?.currentTarget?.value))}
            error={form.errors.hidden_salary}
          />
        </div>

        <div>
          <div>
            <Text fz="sm" className='font-semibold mb-2'>Mô tả công việc <span className='text-red-400'>*</span></Text>
            <Editor theme="snow" value={form.values.description} onChange={(event: any) => form.setFieldValue('description', event)} />
          </div>

          <div>
            <Text fz="sm" className='font-semibold mb-2'>Yêu cầu công việc <span className='text-red-400'>*</span></Text>
            <Editor theme={"snow"} value={form.values.requirements} onChange={(event: any) => form.setFieldValue('requirements', event)} />
          </div>

        </div>

      </div>
      <div className='flex gap-4'>
        <Button disabled={isLoading} className='mt-5' variant='outline' type='submit'>{isLoading ? "Cập nhật..." : "Cập nhật"}</Button>
        <Button onClick={close} className='mt-5 border-gray-500 text-gray-500' variant='outline' type='button'>Hủy</Button>
      </div>
    </form>
  )

}

export default EditJob