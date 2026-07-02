import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import CampusesPage from '@/pages/CampusesPage'
import StudentsPage from '@/pages/StudentsPage'
import NotFoundPage from '@/pages/NotFoundPage'
import CampusDetailPage from '@/pages/CampusDetailPage'
import StudentDetailPage from '@/pages/StudentDetailPage'
import AddCampusPage from '@/pages/AddCampusPage'
import AddStudentPage from '@/pages/AddStudentPage'
import EditCampusPage from '@/pages/EditCampusPage'
import EditStudentPage from '@/pages/EditStudentPage'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="navbar-space">
        <nav className={isScrolled ? 'navbar navbar-scrolled' : 'navbar'}>
          <div className="navbar-brand">
            <div className="brand-mark">CS</div>
            <p className="navbar-title">Campuses & Students</p>
          </div>

          <div className="nav-links">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/campuses">Campuses</NavLink>
            <NavLink to="/students">Students</NavLink>
          </div>
        </nav>
      </div>

      <main className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campuses" element={<CampusesPage />} />
          <Route path="/campuses/:id" element={<CampusDetailPage />} />
          <Route path="/campuses/new" element={<AddCampusPage />} />
          <Route path="/campuses/:id/edit" element={<EditCampusPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
          <Route path="/students/new" element={<AddStudentPage />} />
          <Route path="/students/:id/edit" element={<EditStudentPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </main >
    </>
  )
}

export default App