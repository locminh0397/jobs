
import { Button, CheckIcon, FileInput } from "@mantine/core"
import { notifications } from "@mantine/notifications";
import { IconFile, IconUpload, IconX } from "@tabler/icons-react"
import { FormEvent, useState } from "react";
import { downloadResume, uploadFile } from "../../../services/student";
import { TypeUser } from "../../../type";

type Props = {
  user: TypeUser
}

function Resume({ user }: Props) {
  const [value, setValue] = useState<File>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    uploadFile(value).then((res) => notifications.show({
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

    })
  }
  return (
    <div className=' bg-white profile mt-4 shadow-md py-2'>
      <div className='flex px-4 gap-2 items-center'>
        <IconFile size={30} className='text-[#005247]' />
        <h1 className="flex text-[#005247] text-xl font-bold items-center gap-2 justify-between">CV</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex items-end gap-4">
        <FileInput
          value={value}
          onChange={setValue}
          className="flex-1"
          placeholder="Chọn file CV"
          label="CV của bạn"
          withAsterisk
          accept=".pdf"
          icon={<IconUpload size={14} />}
        />
        <Button disabled={isLoading} type="submit" variant="outline">{isLoading ? "Đang tải lên..." : "Lưu CV"}</Button>
      </form>

      {!user.resume && <p className="text-red-500 px-4 text-sm italic">(*) Vui lòng cập nhật CV</p>}
      {user.resume && <Button variant="default" className="border-none text-blue-500" onClick={() => downloadResume(user.full_name)}>{user.full_name}.pdf</Button>}

    </div>
  )
}

export default Resume