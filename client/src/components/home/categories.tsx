import { Box, Title } from '@mantine/core'
import React from 'react'
import CardCategory from '../card/card-category';
import { industries } from '@/data/industries';
import { industriesFind } from '@/data/datafind/industry';

function Categories() {

  return (
    <Box className='overflow-x-hidden' px={"md"} py="md" mt={20}>
      <div className='flex mb-5 justify-between items-center'>
        <Title className='text-[#005247] relative before:w-1/2 before:absolute before:h-1 before:bg-[#005247] before:-bottom-1' order={2}>
          Ngành nghề nổi bật
        </Title>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-sm'>
        {industriesFind.slice(0, 12).map((c: any, index) => (
          <CardCategory key={index} industry={c.value} title={c.label} />
        ))}
      </div>
    </Box>
  )
}

export default Categories