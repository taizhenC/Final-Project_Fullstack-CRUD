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
}

function StudentCard({
    firstName,
    lastName,
    email,
    gpa,
    campusName,
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
            </CardContent>
        </Card>
    )
}

export default StudentCard