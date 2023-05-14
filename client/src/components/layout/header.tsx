import { TMenu, menus } from '@/data/Menu';
import {
  createStyles,
  Header,
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Menu,
  Button,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconBriefcase, IconLayoutDashboard, IconLogout, IconPassword, IconStar, IconUser } from '@tabler/icons-react';
import { getUser, logout } from '../../../services/auth';
import { TypeUser } from '../../../type';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.white,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      color: "#1C7ED6"
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
      background: "#EA580C"!
    },

  },
}));

const menusSideBar = [
  { id: 2, title: "Hồ sơ", href: "/dashboard/profile", icon: <IconUser size={20} /> },
  { id: 3, title: "Công việc đã ứng tuyển", href: "/dashboard/job-management", icon: <IconBriefcase size={20} /> },
  { id: 4, title: "Công việc đã lưu", href: "/dashboard/saved-job", icon: <IconStar size={20} /> },
  { id: 5, title: "Đổi mật khẩu", href: "/dashboard/change-password", icon: <IconPassword size={20} /> }
]


export function HeaderMegaMenu() {
  const [user, setUser] = useState<TypeUser>()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { push, reload } = useRouter()

  const handleLogout = () => {
    logout()
    reload()
  }

  useEffect(() => {
    getUser().then((res) => setUser(res)).catch(err => console.clear())
  }, [])

  return (
    <Box className='header sticky top-0 z-50' >
      <Header height={60} className='bg-[#005247]' px={"md"}>
        <Group position="apart" sx={{ height: '100%' }}>
          {/* <MantineLogo size={30} /> */}
          <Link href={"/"} className='text-xl select-none lg:text-2xl italic font-bold text-blue-500'>Intern Jobs</Link>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            {menus.map((menu: TMenu, index: number) => (
              <Link className={classes.link} href={menu.href} key={index}>
                {menu.title}
              </Link>
            ))}
          </Group>
          {user?.email ? (
            <Menu shadow="md" >
              <Menu.Target>
                <Group className={`${classes.hiddenMobile} cursor-pointer`} >
                  {user?.avatar_url ? <Image alt='photo' width={50} height={50} src={user?.avatar_url} /> : <Avatar className='bg-gray-500 rounded-full' variant='filled' radius="xl" />}
                  <h3 className='text-white'>{user?.full_name}</h3>
                </Group>
              </Menu.Target>

              <Menu.Dropdown>
                {menusSideBar.map((menu) => (
                  <Menu.Label key={menu.id}>
                    <Link className='!text-black flex items-center gap-2 text-base' href={menu.href} >{menu.icon} {menu.title}</Link>
                  </Menu.Label>
                ))}
                <Menu.Label >
                  <button onClick={() => handleLogout()} className='!text-black flex items-center gap-2 text-base font-medium'><IconLogout size={20} /> Đăng xuất</button>
                </Menu.Label>
              </Menu.Dropdown>
            </Menu>

          ) : (
            <Group className={classes.hiddenMobile}>
              <Link className='text-white' type='button' href={"http://localhost:3001"}>Nhà tuyển dụng</Link>
              <Link className='text-white' type='button' href={"/auth/signin"} >Đăng nhập</Link>
              <Link className='text-white' type='button' href={"/auth/signup"} >Đăng ký</Link>
            </Group>
          )}


          <Burger opened={drawerOpened} color='white' onClick={toggleDrawer} className={`${classes.hiddenDesktop} hover:!text-[#1c7ed6]`} />
        </Group>
      </Header>


      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={<Link href={"/"} className='text-xl select-none lg:text-2xl italic font-bold text-blue-700'>Intern Jobs</Link>}
        className={`!bg-[#fc752c] ${classes.hiddenDesktop}`}
        zIndex={1000000}

      >
        <ScrollArea className='bg-[#005247]' h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {menus.map((menu: TMenu, index: number) => (
            <Link className={classes.link} href={menu.href} key={index}>
              {menu.title}
            </Link>
          ))}

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {user?.email ? (
            <div className='px-4'>
              <div className='flex items-center gap-2 mb-4'>
                {user?.avatar_url ? <Image alt='photo' width={50} height={50} src={user?.avatar_url} /> : <Avatar className='bg-gray-300 rounded-full' variant='filled' radius="xl" />}
                <h3 className='text-white'>{user?.full_name}</h3>
              </div>
              {menusSideBar.map((menu) => (
                // <Menu.Label key={menu.id}>
                <Link key={menu.id} className='!text-white flex items-center gap-4 mb-2 text-base' href={menu.href} >{menu.icon} {menu.title}</Link>
                // </Menu.Label>
              ))}
              <button onClick={() => handleLogout()} className='!text-white flex items-center gap-4 text-base font-medium'><IconLogout size={20} /> Đăng xuất</button>
            </div>
          ) : (
            <Group position="center" grow pb="xl" px="md">
              <Button type='button' onClick={() => push("/auth/employer")} variant="filled">Nhà tuyển dụng</Button>
              <Button type='button' onClick={() => push("/auth/signin")} variant="outline">Đăng nhập</Button>
              <Button type='button' onClick={() => push("/auth/signup")} variant='outline'>Đăng ký</Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>

    </Box>
  );
}
