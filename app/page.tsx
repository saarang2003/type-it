import { useContext } from 'react';
import { TypingContext } from './(context)/typing';
import useWindowDimensions from './(hooks)/useWindowDimensions';
import Header from './components/Header';
import Typemode from './components/Typemode';
import Footer from './components/Footer';

export default function App() {
  const { typingFocused, resultPreview, typemodeVisible, onPreviewResult } =
    useContext(TypingContext);
  const [windowWidth] = useWindowDimensions();



  return (
    <>
      <Header
        windowWidth={windowWidth}
        onLogoClick={() => onPreviewResult(null)}
      />

      { typemodeVisible && (
        <Typemode
          className={`transition-opacity duration-200 ${
            typingFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } mb-auto`}
        />
      )}

      <main
        className={`pb-10 ${
         typemodeVisible ? 'mt-6 mb-auto' : ''
        }`}
      >
          <Typing />

      </main>      

      <Footer />
    </>
  );
}
