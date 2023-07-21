import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import TaosterProvider from './providers/ToasterProvider'

import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const font = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}
// async await because we are communicating inter-modules!
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <TaosterProvider></TaosterProvider>
        <RegisterModal></RegisterModal>
        <LoginModal></LoginModal>
        <Navbar currentUser={currentUser}></Navbar>
        {children}
      </body>
    </html>
  )
}

// NB simply putting a prop without any ={} will make it a boolean of value true:
// <Modal title='Modal' isOpen ></Modal> title is Modal, isOpen is true
// passing on props as currentUser requires a type, thus, make the interface in the Navbar component