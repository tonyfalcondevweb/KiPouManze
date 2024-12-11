import React from 'react'

const Container = ({ children }) => {
  return (
    <div className={"min-h-screen w-full bg-neutral-900 text-white"}>
      {children}
    </div>
  )
}

export default Container
