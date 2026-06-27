import { Link, useParams } from 'react-router-dom'
import { campuses, students } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function StudentDetailPage() {
  const { id } = useParams()
  const studentId = Number(id)

  const student = students.find((student) => student.id === studentId)

  if (!student) {
    return (
      <div className="content-section">
        <div className="section-heading">
          <p>Student</p>
          <h2>Student not found</h2>
        </div>

        <Button asChild>
          <Link to="/students">Back to Students</Link>
        </Button>
      </div>
    )
  }

  const campus = campuses.find((campus) => campus.id === student.campusId)

  return (
    <div className="content-section">
      <Button asChild variant="outline">
        <Link to="/students">Back to Students</Link>
      </Button>

      <Card className="detail-card">
        <CardHeader>
          <CardDescription>Student Details</CardDescription>
          <CardTitle>
            {student.firstName} {student.lastName}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <p>
            <strong>GPA:</strong> {student.gpa}
          </p>

          <p>
            <strong>Campus:</strong>{' '}
            {campus ? (
              <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
            ) : (
              'Not enrolled'
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDetailPage