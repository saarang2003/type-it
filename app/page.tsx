"use client";
import { useContext } from 'react';
import { TypingContext } from './(context)/typing';

import Header from './components/Header';
import Typemode from './components/Typemode';
import Footer from './components/Footer';
import Typing from './components/Typing/Typing';
import useWindowDimensions from './(hooks)/useWindowDimensions';

export default function App() {
  const { typingFocused,  typemodeVisible, onPreviewResult } =
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
