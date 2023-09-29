import React from 'react'

import { basePath } from '../utils/BasePath'

// import animoDark from '../assets/dark/animo-logo-dark.png'
// import animoLight from '../assets/light/animo-logo-light.png'
// import { useDarkMode } from '../hooks/useDarkMode'

export const Logo: React.FC = () => {
  // const darkMode = useDarkMode()

  return (
    <div className="flex-1-1 m-auto">
      <a href={`${basePath}/`}>
        {/* <img className="h-6 sxl:h-8" src={darkMode ? animoDark : animoLight} alt="animo-logo-light" /> */}
      </a>
    </div>
  )
}
