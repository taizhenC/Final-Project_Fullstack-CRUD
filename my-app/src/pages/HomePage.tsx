import { Button } from '@/components/ui/button'
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
                            <a href="/campuses">View Campuses</a>
                        </Button>
                        <Button asChild variant="outline">
                            <a href="/students">View Students</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}

export default HomePage