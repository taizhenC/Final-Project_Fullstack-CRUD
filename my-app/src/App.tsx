import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import CampusesPage from '@/pages/CampusesPage'
import StudentsPage from '@/pages/StudentsPage'
import NotFoundPage from '@/pages/NotFoundPage'
import CampusDetailPage from '@/pages/CampusDetailPage'
import StudentDetailPage from '@/pages/StudentDetailPage'
import AddCampusPage from '@/pages/AddCampusPage'
import AddStudentPage from '@/pages/AddStudentPage'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Campuses & Students</h1>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/campuses">Campuses</NavLink>
          <NavLink to="/students">Students</NavLink>
        </div>
      </nav>

      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campuses" element={<CampusesPage />} />
          <Route path="/campuses/:id" element={<CampusDetailPage />} />
          <Route path="/campuses/new" element={<AddCampusPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
          <Route path="/students/new" element={<AddStudentPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </main >
    </>
  )
}

export default App