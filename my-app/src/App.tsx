import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import CampusCard from '@/components/CampusCard'
import StudentCard from '@/components/StudentCard'
import { campuses, students } from '@/data/mockData'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Campuses & Students</h1>

        <div className="nav-links">
          <Button asChild variant="ghost">
            <a href="#home">Home</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#campuses">Campuses</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#students">Students</a>
          </Button>
        </div>
      </nav>

      <main className="app">
        <section id="home">
          <Card className="hero-card">
            <CardHeader>
              <CardDescription>Fullstack CRUD Project</CardDescription>
              <CardTitle>Manage campuses and students in one place.</CardTitle>
            </CardHeader>

            <CardContent>
              <p>
                View campuses, track enrolled students, and manage student
                records through a clean web interface.
              </p>

              <div className="hero-actions">
                <Button asChild>
                  <a href="#campuses">View Campuses</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#students">View Students</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="campuses" className="content-section">
          <div className="section-heading">
            <p>Campuses</p>
            <h2>Campus directory</h2>
          </div>

          <div className="card-grid">
            {campuses.map((campus) => (
              <CampusCard
                key={campus.id}
                name={campus.name}
                address={campus.address}
                imageUrl={campus.imageUrl}
                description={campus.description}
              />
            ))}
          </div>
        </section>

        <section id="students" className="content-section">
          <div className="section-heading">
            <p>Students</p>
            <h2>Student directory</h2>
          </div>

          <div className="card-grid">
            {students.map((student) => {
              const campus = campuses.find((campus) => campus.id === student.campusId)

              return (
                <StudentCard
                  key={student.id}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  email={student.email}
                  gpa={student.gpa}
                  campusName={campus?.name}
                />
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default App