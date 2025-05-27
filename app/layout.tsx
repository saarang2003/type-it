import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProfileContextProvider } from "./(context)/profile.context";
import { TypingContextProvider } from "./(context)/typing";
import { TypeModeContextProvider } from "./(context)/typemode";
import { ModalContextProvider } from "./(context)/modal";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description: "This is monkeytype clone . It helps you in improving typing speed ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProfileContextProvider>
             <TypingContextProvider>
               <TypeModeContextProvider>
                 <ModalContextProvider>
                  {children}
                 </ModalContextProvider>
               </TypeModeContextProvider>
             </TypingContextProvider>
           </ProfileContextProvider>
      </body>
    </html>
  );
}
