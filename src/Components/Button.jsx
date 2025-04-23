import React from 'react'

export default function Button({title}) {
  return (
    <button>
        <div className="bg-cyan-950 px-8 py-2 border-2 rounded-full cursor-pointer border-blue-200 text-blue-200 transform hover:scale-115 transition-all duration-150 text-2xl">
            {title}
        </div>
    </button>
  )
}
