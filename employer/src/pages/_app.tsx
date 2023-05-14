import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';


export default function App({ Component, pageProps }: AppProps) {
  return (

    <MantineProvider withNormalizeCSS withGlobalStyles>
      <ModalsProvider>
        <Notifications />
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  )
}
