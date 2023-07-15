import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import RegisterModal from '@/components/modals/RegisterModal'
import TaosterProvider from './providers/ToasterProvider'

const font = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TaosterProvider></TaosterProvider>
        <RegisterModal></RegisterModal>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}

// NB simply putting a prop without any ={} will make it a boolean of value true:
// <Modal title='Modal' isOpen ></Modal> title is Modal, isOpen is true