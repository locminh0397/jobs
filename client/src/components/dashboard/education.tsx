import { Button, CheckIcon, Loader, NumberInput, Table, Text, TextInput } from '@mantine/core'
import { IconSchool, IconTrash, IconX } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { MonthPickerInput } from '@mantine/dates';
import 'dayjs/locale/vi';
import { useForm } from '@mantine/form';
import { createEducation, deleteEducation, getEducation } from '../../../services/student';
import { TypeListEducation } from '../../../type';
import { notifications } from '@mantine/notifications';
import { convertIso8601toMMYYY } from '@/ultil';
import { modals } from '@mantine/modals';


function Education() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingDel, setIsLoadingDel] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [educations, setEducations] = useState<TypeListEducation[] | null>(null)

  const form = useForm<any>({
    initialValues: {
      school_name: "",
      start_year: new Date,
      end_year: new Date,
      gpa_score: 0,
    },

    validate: {
      school_name: (value) => (value.length < 2 ? 'Vui lòng nhập tên trường' : null),

    },
  });

  const handleDelete = (id: string) => {
    setIsLoadingDel(true)
    deleteEducation(id).then((res) => {
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
    createEducation({
      school_name: values.school_name,
      gpa_score: Number(values.gpa_score),
      start_year: new Date(values.start_year).toISOString(),
      end_year: new Date(values.end_year).toISOString()
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

  const fetchEducation = async () => {
    const data = await getEducation()
    return data
  }

  useEffect(() => {
    fetchEducation().then(res => setEducations(res)).catch(err => console.log(err))
  }, [isLoading, isLoadingDel])

  return (
    <div className=' bg-white profile mt-4 shadow-md py-2'>
      <div className='flex px-4 gap-2 items-center'>
        <IconSchool size={30} className='text-[#005247]' />
        <h1 className="flex text-[#005247] text-xl font-bold items-center gap-2 justify-between">Học vấn </h1>
      </div>
      <div className='px-4 py-2'>

        {educations ? (
          <Table className='border mt-2 text-center' striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th className='!text-center'>STT</th>
                <th className='!text-center'>Tên trường</th>
                <th className='!text-center'>GPA</th>
                <th className='!text-center'>Năm bắt đầu</th>
                <th className='!text-center'>Năm kết thúc</th>
                <th className='!text-center'></th>
              </tr>
            </thead>
            {/* {educations ?  */}
            <tbody>
              {
                educations?.map((education, index) => (

                  <tr key={education.id}>

                    <td>{index}</td>
                    <td>{education.school_name}</td>
                    <td>{education.gpa_score}</td>
                    <td>{convertIso8601toMMYYY(education.start_year)}</td>
                    <td>{convertIso8601toMMYYY(education.end_year)}</td>
                    <td><button disabled={isLoadingDel} type='button' onClick={() => openModal(education.id)} >
                      {isLoadingDel ? <p className='text-red-500'>Đang xóa...</p> : (<IconTrash size={20} className="text-red-500 cursor-pointer" />)}
                    </button></td>
                  </tr>
                ))
              }
            </tbody>
            {/* // : <Loader />} */}
          </Table>
        ) : <Loader className='mt-2 mx-auto' />}

        <button onClick={() => setShowForm(true)} type="button" className="text-blue-500 font-semibold hover:underline mt-4">Thêm học vấn</button>

        {
          showForm && (
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className="post  mt-4">
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <TextInput
                  placeholder="Tên trường"
                  label="Tên trường"
                  withAsterisk
                  {...form.getInputProps('school_name')}
                />
                <NumberInput
                  placeholder="Điểm GPA"
                  label="Điểm GPA"
                  withAsterisk
                  precision={2}
                  min={0}
                  step={0.5}
                  max={4}
                  {...form.getInputProps('gpa_score')}
                />
                <MonthPickerInput
                  valueFormat="MM/YYYY"
                  label="Năm bắt đầu"
                  placeholder="Chọn năm bắt đầu"
                  locale='vi'
                  withAsterisk
                  {...form.getInputProps('start_year')}

                />
                <MonthPickerInput
                  valueFormat="MM/YYYY"
                  label="Năm kết thúc"
                  placeholder="Chọn năm kết thúc"
                  locale='vi'
                  {...form.getInputProps('end_year')}
                  withAsterisk
                />
              </div>
              <p className='text-red-500 text-sm mt-2'>Trường có dấu (*) là bắt buộc</p>
              <div className='mt-4 flex gap-2'>
                <Button disabled={isLoading} variant='outline' type='submit'>{isLoading ? (
                  "Đang thêm học vấn..."
                ) : "Thêm học vấn"}</Button>
                <Button onClick={() => setShowForm(false)} variant='outline' className='border hover bg-gray-400 border-gray-400 hover:bg-gray-500 text-white' type='button'>Hủy</Button>
              </div>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default Education