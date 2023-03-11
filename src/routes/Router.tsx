import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { History } from '../pages/history'
import { Timer } from '../pages/timer'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Timer />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
