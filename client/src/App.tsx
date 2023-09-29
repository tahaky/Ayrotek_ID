import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'

import { useAppDispatch } from './hooks/hooks'
import { useAnalytics } from './hooks/useAnalytics'
import { PageNotFound } from './pages/PageNotFound'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { LandingPage } from './pages/landing/LandingPage'
import { OnboardingPage } from './pages/onboarding/OnboardingPage'
import { UseCasePage } from './pages/useCase/UseCasePage'
import { usePreferences } from './slices/preferences/preferencesSelectors'
import { setDarkMode } from './slices/preferences/preferencesSlice'
import { fetchLastServerReset } from './slices/preferences/preferencesThunks'
import { AuthProvider } from './utils/AuthContext'
import { basePath } from './utils/BasePath'
import { PrivateRoute } from './utils/PrivateRoute'
import { ThemeProvider } from './utils/ThemeContext'

function App() {
  useAnalytics()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { connectionDate, lastServerReset } = usePreferences()

  const localStorageTheme = localStorage.theme === 'dark'
  const windowMedia = !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    if (localStorageTheme || windowMedia) {
      dispatch(setDarkMode(true))
    }
  }, [dispatch, localStorageTheme, windowMedia])

  useEffect(() => {
    if (connectionDate) {
      dispatch(fetchLastServerReset())
    }
  }, [connectionDate])

  useEffect(() => {
    if (connectionDate && lastServerReset) {
      if (connectionDate < lastServerReset) {
        navigate(`${basePath}/`)
        dispatch({ type: 'demo/RESET' })
      }
    }
  }, [connectionDate, lastServerReset])

  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            {basePath !== '/' && <Route path="/" element={<Navigate to={basePath} />}></Route>}
            <Route path={`${basePath}/`} element={<LandingPage />} />
            <Route path={`${basePath}/:slug`} element={<LandingPage />} />
            <Route path={`${basePath}/demo`} element={<OnboardingPage />} />
            <Route path={`${basePath}/demo/:slug`} element={<OnboardingPage />} />
            <Route
              path={`${basePath}/dashboard`}
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path={`${basePath}/uc/:slug`}
              element={
                <PrivateRoute>
                  <UseCasePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App