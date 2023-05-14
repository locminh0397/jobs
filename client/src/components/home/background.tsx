import { locations } from '@/data/locations'
import { Button, Input, MediaQuery, Select, TextInput } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { RiMapPinLine, RiSearchLine } from 'react-icons/ri'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from '@mantine/form'


function Background() {
  const [isSearch, setIsSearch] = useState(false)
  const ref = useClickOutside(() => setIsSearch(false));
  const router = useRouter()

  const form = useForm({
    initialValues: {
      title: "",
      location: ""
    },
    validate: {
      title: (val) => (val.length < 6 ? 'Vui lòng nhập tiêu đề' : null),
      location: (val) => (val.length < 6 ? 'Vui lòng chọn địa điểm' : null),
    },
  })

  const handleSearch = (values: any) => {
    router.push(`/jobs/?search=${values.search}&location=${values.location}`)
  }

  return (
    <div className='w-full relative h-[500px] lg:h-[600px]'>
      <Image src="/bg.jpg" alt="bg"
        fill className="w-full h-full top-0 left-0 object-center " />
      <div className='w-full h-full bg-white/70 absolute '>
        <div className='absolute flex flex-col  top-1/3 left-1/2 -translate-x-1/2'>
          <form onSubmit={form.onSubmit((values) => { handleSearch(values) })} ref={ref} className={`${isSearch ? "rounded-tr-xl rounded-tl-xl" : "rounded-full"}  p-4 w-[900px] bg-[#005247]  hidden xl:flex gap-2`}>
            <Input
              onFocus={() => setIsSearch(true)}
              w={500}
              icon={<RiSearchLine size={20} color='#777' />}
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              error={form.errors.title && 'Vui lòng tiêu đề'}
              placeholder="Nhập tiêu đề tìm kiếm..."
              radius="xl"
              size="lg"

            />

            <Select
              value={form.values.location}
              onChange={(event) => form.setFieldValue('location', event!)}
              error={form.errors.location && 'Vui lòng chọn địa điểm'}
              icon={<RiMapPinLine size={20} color='#777' />}
              radius="xl"
              size="lg"
              placeholder="Chọn địa điểm..."
              data={locations.sort((a, b) => a.label.localeCompare(b.label))}

            />
            <Button type="submit" className='text-white hover:text-[#004257]' variant='default' radius="xl" size="lg">
              Tìm kiếm
            </Button>
          </form>

          <form ref={ref} className={`${isSearch ? "rounded-tr-xl rounded-tl-xl" : "rounded-full"} p-4 w-[700px] hidden lg:flex xl:hidden bg-[#005247] gap-2`} >
            <Input required
              onFocus={() => setIsSearch(true)}
              w={400}
              icon={<RiSearchLine color='#777' />}
              // variant="filled"
              placeholder="Nhập tiêu đề tìm kiếm..."
              radius="xl"
              size="md"
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              error={form.errors.title && 'Vui lòng tiêu đề'}
            />

            <Select
              value={form.values.location}
              onChange={(event) => form.setFieldValue('location', event!)}
              error={form.errors.location && 'Vui lòng chọn địa điểm'}
              icon={<RiMapPinLine size={20} color='#777' />}
              radius="xl"
              size="md"
              placeholder="Chọn địa điểm..."
              data={locations.sort((a, b) => a.label.localeCompare(b.label))}
            />
            <Button type="submit" className='text-white hover:text-[#004257]' variant='default' radius="xl" size="md">
              Tìm kiếm
            </Button>
          </form>

          <form ref={ref} className={`${isSearch ? "rounded-tr-xl rounded-tl-xl" : "rounded-full"} p-4 w-[600px] hidden md:flex lg:hidden xl:hidden bg-[#005247] gap-2`}>
            <Input required
              onFocus={() => setIsSearch(true)}
              w={400}
              icon={<RiSearchLine color='#777' />}
              // variant="filled"
              placeholder="Nhập tiêu đề tìm kiếm..."
              radius="xl"
              size="md"

              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              error={form.errors.title && 'Vui lòng tiêu đề'}
            />

            <Select
              value={form.values.location}
              onChange={(event) => form.setFieldValue('location', event!)}
              error={form.errors.location && 'Vui lòng chọn địa điểm'}
              icon={<RiMapPinLine size={20} color='#777' />}
              radius="xl"
              size="md"
              placeholder="Chọn địa điểm..."
              data={locations.sort((a, b) => a.label.localeCompare(b.label))}
            />
            <Button type="submit" className='text-white hover:text-[#004257]' variant='default' radius="xl" size="md">
              Tìm kiếm
            </Button>
          </form>

          <form ref={ref} className={`${isSearch ? "rounded-tr-xl rounded-tl-xl" : "rounded-full"} p-4 w-[500px] flex md:hidden lg:hidden xl:hidden bg-[#005247] gap-2`}>
            <Input required
              onFocus={() => setIsSearch(true)}
              w={200}
              icon={<RiSearchLine color='#777' />}
              // variant="filled"
              placeholder="Nhập tiêu đề tìm kiếm..."
              radius="xl"
              size="sm"

              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              error={form.errors.title && 'Vui lòng tiêu đề'}
            />

            <Select
              value={form.values.location}
              onChange={(event) => form.setFieldValue('location', event!)}
              error={form.errors.location && 'Vui lòng chọn địa điểm'}
              icon={<RiMapPinLine size={20} color='#777' />}
              w={200}
              radius="xl"
              size="sm"
              placeholder="Chọn địa điểm..."
              data={locations.sort((a, b) => a.label.localeCompare(b.label))}
            />
            <Button type="submit" className='text-white hover:text-[#004257]' variant='default' radius="xl" size="sm">
              Tìm kiếm
            </Button>
          </form>
          {
            isSearch && (
              <div ref={ref} className='grid grid-cols-1 lg:grid-cols-2 gap-2 h-[150px] px-4 py-2 rounded-bl-xl border-t rounded-br-xl w-[500px] md:w-[600px] lg:w-[700px] xl:w-[900px] bg-[#005247]'>
                <div>
                  <h3 className='text-sm lg:text-lg text-white'>Tìm kiếm gần đây</h3>
                </div>
                <div>
                  <h3 className='text-sm lg:text-lg text-white'>Ngành nghề phổ biến</h3>

                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Background