import { Outlet } from 'react-router-dom'

export const DefaultLayout = () => {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
    </div>
  )
}