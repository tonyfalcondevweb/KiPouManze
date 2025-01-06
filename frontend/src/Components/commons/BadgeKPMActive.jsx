import React from 'react'

const BadgeKPMActive = ({children}) => {
  return (
    <span className="inline-flex items-center justify-center rounded-lg m-1 p-2 text-sm font-medium text-main-kipoumanze shadow-md bg-slate-900 duration-300 ease-in-out active:scale-75 hover:cursor-pointer">
      {children}
    </span>
  )
}

export default BadgeKPMActive