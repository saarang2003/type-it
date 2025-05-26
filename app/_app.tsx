import type { AppProps } from 'next/app';
import { ProfileContextProvider } from '../context/profile.context';
import { TypingContextProvider } from '../context/typing.context';
import { TypemodeContextProvider } from '../context/typemode.context';
import { ModalContextProvider } from '../context/modal.context';
import '../styles/global.css'; // or global.scss if you still use SCSS

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProfileContextProvider>
      <TypingContextProvider>
        <TypemodeContextProvider>
          <ModalContextProvider>
            <Component {...pageProps} />
          </ModalContextProvider>
        </TypemodeContextProvider>
      </TypingContextProvider>
    </ProfileContextProvider>
  );
}
