import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Input from './components/Input'
import { ApiDataProvider } from './context/ApiData'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <main className="grow flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto w-full gap-stack-lg">
        <Hero />
        <ApiDataProvider>
          <Input />
        </ApiDataProvider>

      </main>
    </>
  )
}

export default App
