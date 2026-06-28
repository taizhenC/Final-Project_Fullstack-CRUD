import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

function HomePage() {
    return (
        <section id="home">
            <Card className="hero-card">
                <CardHeader>
                    <CardDescription>Campus & Student Management</CardDescription>
                    <CardTitle>
                        Explore campuses and manage student enrollment.
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p>
                        Browse all campuses, view enrolled students, and keep student
                        records organized in one fullstack CRUD app.
                    </p>

                    <div className="hero-actions">
                        <Button asChild>
                            <Link to="/campuses">View Campuses</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/students">View Students</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default HomePage