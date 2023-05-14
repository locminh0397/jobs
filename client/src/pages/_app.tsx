import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>

      <MantineProvider withNormalizeCSS withGlobalStyles>
        <ModalsProvider>
          <Notifications />
          <title>Tìm kiếm việc làm thực tập cho sinh viên</title>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ModalsProvider>
      </MantineProvider>

    </QueryClientProvider>
  )
}
