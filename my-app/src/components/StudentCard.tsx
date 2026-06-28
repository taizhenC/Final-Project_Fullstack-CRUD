import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type StudentCardProps = {
    firstName: string
    lastName: string
    email: string
    gpa: number
    campusName?: string
    id: number
}

function StudentCard({
    firstName,
    lastName,
    email,
    gpa,
    campusName,
    id,
}: StudentCardProps) {
    return (
        <Card className="student-card">
            <CardHeader>
                <CardTitle>
                    {firstName} {lastName}
                </CardTitle>
                <CardDescription>{email}</CardDescription>
            </CardHeader>

            <CardContent>
                <p>GPA: {gpa}</p>
                <p>Campus: {campusName ?? 'Not enrolled'}</p>
                <Button asChild variant="outline" className="card-button">
                    <Link to={`/students/${id}`}>View Details</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default StudentCard