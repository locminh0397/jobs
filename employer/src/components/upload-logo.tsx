import { useRef, useState } from 'react';
import { Text, Group, Button, createStyles, rem, Image, SimpleGrid, CheckIcon } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload, IconPhoto } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { uploadLogo } from '../../services/company';
import { uploadImage } from '@/ultils';

type Props = {
  user: any
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: rem(30),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}));

export function UploadLogo({ user }: Props) {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const { replace, asPath } = useRouter()

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        className='!w-full !h-full rounded-full'
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const handleUploadImage = async () => {
    if (files.length <= 0) {
      notifications.show({
        title: "Lỗi!", message: "Vui lòng chọn ảnh đại diện.", icon: <IconX />, styles: (theme) => ({

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
    }
    else {
      setIsLoading(true)
      const res = await uploadImage(files[0])
      uploadLogo(res?.url).then((res) => {
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
        setFiles([])
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
        replace(asPath)
      })
    }
  }
  return (
    <div className=' bg-white profile mt-4 shadow-md py-2 mb-4'>

      <div className="p-4 flex gap-4">
        <div className='w-[300px] h-[300px] rounded-full border border-dotted flex justify-center items-center bg-gray-200'>
          {files.length > 0 ? previews : user.logo_url ? <Image src={user.logo_url} /> : <p className='text-2xl'>Logo</p>}
        </div>

        <div className={`${classes.wrapper} flex-1`}>
          <Dropzone
            openRef={openRef}
            onDrop={setFiles}
            className={classes.dropzone}
            radius="md"
            accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
            maxSize={30 * 1024 ** 2}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Group position="center">
                <Dropzone.Accept>
                  <IconDownload
                    size={rem(50)}
                    color={theme.colors[theme.primaryColor][6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload
                    size={rem(50)}
                    color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                <Dropzone.Idle>Chọn logo</Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                {files.length === 0 ? "Kéo thả tập tin vào đây để tải lên. Chúng tôi chỉ có thể chấp nhận các tệp .jepg hoặc .png có kích thước nhỏ hơn 5mb. Kích thước đề nghị 300x300" : files[0].path}
              </Text>
            </div>
          </Dropzone>

          <Button disabled={isLoading} onClick={handleUploadImage} variant='outline' className='mt-4 ml-auto block' size="md" radius="xl" type='button'>
            {isLoading ? "Đang tải lên..." : " Cập nhật logo"}
          </Button>
        </div>


      </div>

    </div>

  );
}