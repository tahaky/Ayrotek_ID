import type { ReactChild, ReactFragment, ReactPortal } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { basePath } from './BasePath'

export const PrivateRoute = (props: { children: ReactChild | ReactFragment | ReactPortal }) => {
  const auth = useAuth()
  return auth ? <>{props.children}</> : <Navigate to={`${basePath}/`} />
}
