import { RouterProvider, createBrowserRouter } from 'react-router'
import { Root } from './components/layout/Root'
import HomePage from './pages/HomePage'
import SymptomPage from './pages/SymptomPage'
import SymptomCategoryPage from './pages/SymptomCategoryPage'
import HospitalsPage from './pages/HospitalsPage'
import HospitalTypePage from './pages/HospitalTypePage'
import PharmacyPage from './pages/PharmacyPage'
import MyAppointmentsPage from './pages/MyAppointmentsPage'
import CommunityPage from './pages/CommunityPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'symptom', Component: SymptomPage },
      { path: 'symptom/:slug', Component: SymptomCategoryPage },
      { path: 'hospitals', Component: HospitalsPage },
      { path: 'hospitals/:type', Component: HospitalTypePage },
      { path: 'pharmacy', Component: PharmacyPage },
      { path: 'my-appointments', Component: MyAppointmentsPage },
      { path: 'community', Component: CommunityPage },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
