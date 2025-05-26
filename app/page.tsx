import { useState, useContext, useEffect } from 'react';
import socket from '@/api/socket';
import { TypingContext } from '@/context/typing.context';
import { ModalContext } from '@/context/modal.context';
import { useWindowDimensions } from '@/hooks';
import Header from '@/components/Header';
import Result from '@/components/Typing/Result';
import Typing from '@/components/Typing';
import OneVersusOne from '@/components/OneVersusOne';
import Footer from '@/components/Footer';
import Typemode from '@/components/Typemode';

export default function App() {
  const { typingFocused, resultPreview, typemodeVisible, onPreviewResult } =
    useContext(TypingContext);
  const { activeModal, onOpenModal } = useContext(ModalContext);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [windowWidth] = useWindowDimensions();

  useEffect(() => {
    if (activeModal?.modal === 'oneVersusOne') {
      socket.on('has-joined-room', (roomCode: string) => {
        setRoomCode(roomCode);
        onOpenModal(null);
      });
    }

    return () => {
      socket.off('has-joined-room');
    };
  }, [activeModal, onOpenModal]);

  return (
    <>
      <Header
        windowWidth={windowWidth}
        roomCode={roomCode}
        onLogoClick={() => onPreviewResult(null)}
        onLeaveRoom={() => setRoomCode(null)}
      />

      {!roomCode && typemodeVisible && (
        <Typemode
          className={`transition-opacity duration-200 ${
            typingFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } mb-auto`}
        />
      )}

      <main
        className={`pb-10 ${
          !roomCode && typemodeVisible ? 'mt-6 mb-auto' : ''
        }`}
      >
        {roomCode ? (
          <OneVersusOne roomCode={roomCode} />
        ) : resultPreview ? (
          <Result
            result={resultPreview.state}
            onGoBack={() => onPreviewResult(null)}
            {...resultPreview.options}
          />
        ) : (
          <Typing />
        )}
      </main>

      <Footer
        roomCode={roomCode}
        onPreviewResult={(result) => onPreviewResult(result)}
      />
    </>
  );
}
