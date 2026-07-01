import { Link, useParams } from 'react-router-dom'
import { campuses, students } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
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

    const [selectedCampusId, setSelectedCampusId] = useState(
        student?.campusId?.toString() ?? '',
    )

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
            <div className="detail-toolbar">
                <Button asChild variant="outline" className="back-button">
                    <Link to="/students">Back to Students</Link>
                </Button>

                <div className="detail-toolbar-actions">
                    <Button asChild className="edit-button">
                        <Link to={`/students/${student.id}/edit`}>Edit Student</Link>
                    </Button>

                    <Button
                        variant="destructive"
                        className="delete-button"
                        onClick={() => {
                            console.log('Delete student:', student.id)
                            alert('Delete student clicked. Backend connection will be added later.')
                        }}
                    >
                        Delete Student
                    </Button>
                </div>
            </div>

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

            <Card className="form-card">
                <CardHeader>
                    <CardDescription>Enrollment</CardDescription>
                    <CardTitle>Change Campus</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="app-form">
                        <label>
                            Campus
                            <select
                                value={selectedCampusId}
                                onChange={(event) => setSelectedCampusId(event.target.value)}
                            >
                                <option value="">Not enrolled</option>
                                {campuses.map((campus) => (
                                    <option key={campus.id} value={campus.id}>
                                        {campus.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <Button
                            onClick={() => {
                                console.log('Change student campus:', {
                                    studentId: student.id,
                                    campusId: selectedCampusId ? Number(selectedCampusId) : null,
                                })
                                alert('Change campus clicked. Backend connection will be added later.')
                            }}
                        >
                            Save Campus Change
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudentDetailPage