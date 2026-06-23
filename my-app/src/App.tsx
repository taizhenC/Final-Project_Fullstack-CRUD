import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Campuses & Students</h1>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#campuses">Campuses</a>
          <a href="#students">Students</a>
        </div>
      </nav>

      <main className="app">
        <section id="home" className="hero">
          <p className="eyebrow">Fullstack CRUD Project</p>
          <h2>Manage campuses and students in one place.</h2>
          <p>
            View campuses, track enrolled students, and manage student records
            through a clean web interface.
          </p>
        </section>

        <section id="campuses" className="section">
          <div className="section-heading">
            <p className="eyebrow">Campuses</p>
            <h2>Campus directory</h2>
          </div>

          <p className="placeholder-text">
            Campus cards will be added here next.
          </p>
        </section>

        <section id="students" className="section">
          <div className="section-heading">
            <p className="eyebrow">Students</p>
            <h2>Student directory</h2>
          </div>

          <p className="placeholder-text">
            Student cards will be added here next.
          </p>
        </section>
      </main>
    </>
  )
}

export default App