import type { AppProps } from 'next/app';
import '../styles/global.css'; // or global.scss if you still use SCSS
import { ProfileContextProvider } from './(context)/profile.context';
import { TypingContextProvider } from './(context)/typing';
import { TypeModeContextProvider } from './(context)/typemode';
import { ModalContextProvider } from './(context)/modal';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProfileContextProvider>
      <TypingContextProvider>
        <TypeModeContextProvider>
          <ModalContextProvider>
            <Component {...pageProps} />
          </ModalContextProvider>
        </TypeModeContextProvider>
      </TypingContextProvider>
    </ProfileContextProvider>
  );
}
