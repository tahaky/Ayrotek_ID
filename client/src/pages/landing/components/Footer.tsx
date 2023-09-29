import React from 'react'

// import animoDark from '../../../assets/dark/animo-logo-dark.png'
// import animoLight from '../../../assets/light/animo-logo-light.png'
// import { useDarkMode } from '../../../hooks/useDarkMode'

export const Footer: React.FC = () => {
  // const darkMode = useDarkMode()

  return (
    <div>
      <div className="flex dark:text-white justify-center content-center mt-2 select-none">
        <a href="mailto:info@ayrotek.com.tr">info@ayrotek.com.tr</a>
      </div>
      <div className="flex dark:text-white justify-center content-center select-none">
        <p className="self-center mr-2 text-sm">Copyright &#169; 2023 Ayrotek</p>
      </div>
    </div>
  )
}
