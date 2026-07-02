import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <section className="home-page">
            <div className="home-hero">
                <div className="home-hero-content">
                    <p className="home-eyebrow">Campus & Student Management</p>

                    <h1 className="home-title">
                        Manage Campuses
                        <span>and Students</span>
                    </h1>
                    <p className="home-description">
                        Browse all campuses, view enrolled students, and keep student
                        records organized in one fullstack CRUD app.
                    </p>

                    <div className="home-actions">
                        <Button asChild>
                            <Link to="/campuses">View Campuses</Link>
                        </Button>
                        <Button asChild variant="outline" className="home-secondary-button">
                            <Link to="/students">View Students</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage