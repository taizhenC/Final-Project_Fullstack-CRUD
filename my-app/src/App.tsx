import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

        <section id="campuses" className="section-grid">
          <Card>
            <CardHeader>
              <CardDescription>Campuses</CardDescription>
              <CardTitle>Campus directory</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Campus cards will be added here next.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Students</CardDescription>
              <CardTitle>Student directory</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student cards will be added here next.</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  )
}

export default App