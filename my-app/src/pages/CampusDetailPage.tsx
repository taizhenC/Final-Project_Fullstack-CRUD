import { Link, useParams } from 'react-router-dom'
import { campuses, students } from '@/data/mockData'
import StudentCard from '@/components/StudentCard'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

function CampusDetailPage() {
    const { id } = useParams()
    const campusId = Number(id)

    const campus = campuses.find((campus) => campus.id === campusId)

    if (!campus) {
        return (
            <section className="content-section">
                <div className="section-heading">
                    <p>Campus</p>
                    <h2>Campus not found</h2>
                </div>

                <Button asChild>
                    <Link to="/campuses">Back to Campuses</Link>
                </Button>
            </section>
        )
    }

    const enrolledStudents = students.filter(
        (student) => student.campusId === campus.id,
    )

    return (
        <section className="content-section">
            <Button asChild variant="outline">
                <Link to="/campuses">Back to Campuses</Link>
            </Button>

            <Button asChild className="detail-action-button">
                <Link to={`/campuses/${campus.id}/edit`}>Edit Campus</Link>
            </Button>

            <Button
                variant="destructive"
                className="detail-action-button"
                onClick={() => {
                    console.log('Delete campus:', campus.id)
                    alert('Delete campus clicked. Backend connection will be added later.')
                }}
            >
                Delete Campus
            </Button>

            <Card className="detail-card">
                <img src={campus.imageUrl} alt={campus.name} className="detail-image" />

                <CardHeader>
                    <CardDescription>{campus.address}</CardDescription>
                    <CardTitle>{campus.name}</CardTitle>
                </CardHeader>

                <CardContent>
                    <p>{campus.description}</p>
                </CardContent>
            </Card>

            <div className="section-heading">
                <p>Enrolled Students</p>
                <h2>Students at {campus.name}</h2>
            </div>


            {enrolledStudents.length > 0 ? (
                <div className="card-grid">
                    {enrolledStudents.map((student) => (
                        <div key={student.id} className="student-action-card">
                            <StudentCard
                                id={student.id}
                                firstName={student.firstName}
                                lastName={student.lastName}
                                email={student.email}
                                gpa={student.gpa}
                                campusName={campus.name}
                            />

                            <Button
                                variant="outline"
                                className="card-button unenroll-button"
                                onClick={() => {
                                    console.log('Unenroll student:', student.id)
                                    alert(
                                        'Unenroll student clicked. Backend connection will be added later.',
                                    )
                                }}
                            >
                                Remove from Campus
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-message">No students are enrolled at this campus.</p>
            )}
        </section>
    )
}

export default CampusDetailPage