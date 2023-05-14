import { Button, CheckIcon, Loader, Select, Table, Text, TextInput } from '@mantine/core'
import { IconSchool, IconStars, IconTrash, IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { MonthPickerInput } from '@mantine/dates';
import 'dayjs/locale/vi';
import { useForm } from '@mantine/form';
import { createExperience, deleteEducation, deleteExperience, getExperience } from '../../../services/student';
import { TypeListExperience } from '../../../type';
import { notifications } from '@mantine/notifications';
import { convertIso8601toMMYYY } from '@/ultil';
import { modals } from '@mantine/modals';
import { levels } from '@/data/levles';

function Experience() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingDel, setIsLoadingDel] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [experience, setExperience] = useState<TypeListExperience[] | null>(null)

  const form = useForm<any>({
    initialValues: {
      company_name: "",
      end_at: new Date,
      started_at: new Date,
      level: "",
    },

    validate: {
      level: (value) => (value.length < 2 ? 'Vui lòng nhập cấp bậc' : null),
      company_name: (value) => (value.length < 2 ? 'Vui lòng nhập tên công ty' : null),
    },
  });

  const handleDelete = (id: string) => {
    setIsLoadingDel(true)
    deleteExperience(id).then((res) => {
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
      setIsLoadingDel(false)
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
    confirmProps: { color: 'red', variant: "filled" },
    labels: { confirm: 'Xóa', cancel: 'Hủy' },
    onCancel: () => console.log('Cancel'),
    onConfirm: async () => await handleDelete(id),
  });

  const handleSubmit = (values: any) => {
    setIsLoading(true)
    createExperience({
      company_name: values.company_name,
      level: values.level,
      started_at: new Date(values.started_at).toISOString(),
      end_at: new Date(values.end_at).toISOString()
    }).then((res) => {
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
      });
      form.reset()
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
      setIsLoading(false)
    })
  }

  const fetchExperience = async () => {
    const data = await getExperience()
    return data
  }

  useEffect(() => {
    fetchExperience().then(res => setExperience(res)).catch(err => console.log(err))
  }, [isLoading, isLoadingDel])

  return (
    <div className=' bg-white profile mt-4 shadow-md py-2'>
      <div className='flex px-4 gap-2 items-center'>
        <IconStars size={30} className='text-[#005247]' />
        <h1 className="flex text-[#005247] text-xl font-bold items-center gap-2 justify-between">Kinh nghiệm </h1>
      </div>
      <div className='px-4 py-2'>

        {experience ? (
          <Table className='border mt-2 text-center' striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th className='!text-center'>STT</th>
                <th className='!text-center'>Tên công ty</th>
                <th className='!text-center'>Cấp bậc</th>
                <th className='!text-center'>Ngày bắt đầu</th>
                <th className='!text-center'>Ngày kết thúc</th>
                <th className='!text-center'></th>
              </tr>
            </thead>
            {/* {educations ?  */}
            <tbody>
              {
                experience?.map((experience, index) => (

                  <tr key={experience.id}>

                    <td>{index}</td>
                    <td>{experience.company_name}</td>
                    <td>{experience.level}</td>
                    <td>{convertIso8601toMMYYY(experience.started_at)}</td>
                    <td>{convertIso8601toMMYYY(experience.end_at)}</td>
                    <td><button disabled={isLoadingDel} type='button' onClick={() => openModal(experience.id)} >
                      {isLoadingDel ? <p className='text-red-500'>Đang xóa...</p> : (<IconTrash size={20} className="text-red-500 cursor-pointer" />)}
                    </button></td>
                  </tr>
                ))
              }
            </tbody>
            {/* // : <Loader />} */}
          </Table>
        ) : <Loader className='mt-2 mx-auto' />}

        <button onClick={() => setShowForm(true)} type="button" className="text-blue-500 font-semibold hover:underline mt-4">Thêm kinh nghiệm</button>

        {
          showForm && (
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className="post  mt-4">
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <TextInput
                  placeholder="Nhập tên công ty"
                  label="Tên công ty"
                  withAsterisk
                  {...form.getInputProps('company_name')}
                />
                <Select
                  label="Cấp bậc"
                  placeholder="chọn cấp bậc"
                  data={levels}
                  {...form.getInputProps('level')}
                  withAsterisk
                />
                <MonthPickerInput
                  valueFormat="MM/YYYY"
                  label="Ngày bắt đầu"
                  placeholder="Chọn ngày bắt đầu"
                  locale='vi'
                  withAsterisk
                  {...form.getInputProps('started_at')}

                />
                <MonthPickerInput
                  valueFormat="MM/YYYY"
                  label="Ngày kết thúc"
                  placeholder="Chọn ngày kết thúc"
                  locale='vi'
                  {...form.getInputProps('end_at')}
                  withAsterisk
                />
              </div>
              <p className='text-red-500 text-sm mt-2'>Trường có dấu (*) là bắt buộc</p>
              <div className='mt-4 flex gap-2'>
                <Button disabled={isLoading} variant='outline' type='submit'>{isLoading ? (
                  "Đang thêm kinh nghiệm..."
                ) : "Thêm kinh nghiệm"}</Button>
                <Button onClick={() => setShowForm(false)} variant='outline' className='border hover bg-gray-400 border-gray-400 hover:bg-gray-500 text-white' type='button'>Hủy</Button>
              </div>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default Experience