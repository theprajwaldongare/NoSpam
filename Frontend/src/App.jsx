import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className="grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto w-full gap-stack-lg">
        <Hero />
      </main>
    </>
  )
}

export default App
