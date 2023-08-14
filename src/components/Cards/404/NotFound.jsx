import React from 'react'

function NotFound() {
  return (
    <section className='flex flex-col justify-center items-center w-full h-screen bg-[#F2E9E4]'>
      <h1 className='text-9xl text-[#22223B] font-black'>404</h1>
      <h2 className='text-2xl border-[#22223B]'>Page not found</h2>
      <a href="/">
      <button className='mt-10 border-[#22223B] border-b-2 text-[#22223B] text-lg'>volver</button>
      </a>

    </section>
  )
}

export default NotFound