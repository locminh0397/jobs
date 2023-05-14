import React, { use, useEffect, useState } from 'react'
import { TypeStudentForm, TypeUser } from '../../../type'
import { IconEdit, IconInfoCircle, IconX } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import { Button, CheckIcon, Group, Select, TextInput } from '@mantine/core'
import { editProfileStudent } from '../../../services/student'
import { useSession } from 'next-auth/react'
import { notifications } from '@mantine/notifications'
import { locations } from '@/data/locations'
import { industries } from '@/data/industries'
import { useRouter } from 'next/router'

type Props = {
  user: TypeUser
}
function EditProfile({ user }: Props) {
  const [edit, setEdit] = useState(false)
  const [state, setState] = useState(locations.find(location => location.label === user?.city)?.districts.map(districs => districs.label))
  const [isLoading, setIsLoading] = useState(false)
  const { replace, asPath } = useRouter()

  const city: string[] = locations.map(location => location.label)

  const form = useForm({
    initialValues: {
      full_name: user.full_name,
      phone: user.phone,
      city: user.city,
      state: user.state,
      address: user.address,
      industry: user.industry
    },
  });

  const handleEditStudent = (dataForm: TypeStudentForm) => {
    setIsLoading(true)
    editProfileStudent(dataForm).then((res) => notifications.show({
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
    })).catch(err =>
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
      replace(asPath)
    })
  }


  useEffect(() => {
    const districts = locations.find(location => location.label === form.values.city)?.districts.map(districs => districs.label)
    setState(districts)
  }, [form.values.city])


  return (
    <div className=' bg-white profile  shadow-md'>
      <div className='px-4 flex items-center gap-2 w-full'>
        <IconInfoCircle size={30} className='text-[#005247]' />
        <h1 className="flex flex-1 font-bold items-center text-[#005247] gap-2 justify-between text-xl"> Thông tin cá nhân <button className='p-2 bg-gray-200 rounded-md text-red-500' onClick={() => setEdit(true)}><IconEdit /> </button></h1>
      </div>

      {!edit ? (
        <div>
          {user ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4'>
              <h3>
                <span className='font-semibold text-base md:text-lg'>Họ tên:</span> {user?.full_name}
              </h3>
              <h3>
                <span className='font-semibold text-base md:text-lg'>Điện thoại:</span> {user?.phone}
              </h3>
              <h3>
                <span className='font-semibold text-base md:text-lg'>Tỉnh/tp:</span> {user?.city}
              </h3>
              <h3>
                <span className='font-semibold text-base md:text-lg'>Quận/huyện:</span> {user?.state}
              </h3>

              <h3>
                <span className='font-semibold text-base md:text-lg'>Ngành nghề:</span> {user?.industry}
              </h3>
              <h3>
                <span className='font-semibold text-base md:text-lg'>Địa chỉ:</span> {user?.address}
              </h3>

            </div>
          ) :
            <div className='w-full flex justify-center items-center h-[100px]'>
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span
                >
              </div>
            </div>

          }
        </div>
      ) : (
        <div>
          {user ? (
            <form className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 !text-black lg:grid-cols-3' onSubmit={form.onSubmit((values) => handleEditStudent(values))}>
              <TextInput
                label="Họ tên"
                placeholder="Nhập họ tên"

                {...form.getInputProps('full_name')}
              />
              <TextInput

                label="Điện thoại"
                placeholder="Nhập điện thoại"
                {...form.getInputProps('phone')}
              />
              <Select
                label="Tỉnh/tp"
                placeholder="Chọn tỉnh thành phố"
                data={city.sort()}
                // defaultValue={user.city}
                {...form.getInputProps('city')}
              />
              <Select
                label="Quận/huyện"
                placeholder="Chọn quận huyện"
                data={state!.sort()}
                // defaultValue={user.city}
                {...form.getInputProps('state')}
              />
              <TextInput

                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                {...form.getInputProps('address')}
              />
              <Select
                label="Ngành nghề"
                placeholder="Chọn ngành nghề"
                data={industries.sort() as any}
                // defaultValue={user.city}
                {...form.getInputProps('industry')}
              />

              <Group mt={'sm'}>
                <Button disabled={isLoading} variant='outline' className='text-blue-500' type="submit"> {isLoading ? (
                  "Đang cập nhật..."
                ) : "Cập nhật"}</Button>
                <Button onClick={() => setEdit(false)} type="button" className="bg-gray-400 text-white border-none hover:bg-gray-500" variant='outline' >Hủy</Button>
              </Group>
            </form>
          ) : <div className='w-full flex justify-center items-center h-[100px]'>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
              >
            </div>
          </div>}
        </div>

      )}
    </div>
  )
}

export default EditProfile