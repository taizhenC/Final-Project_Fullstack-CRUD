import { useState } from 'react'
import type { FormEvent } from 'react'
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

function EditStudentPage() {
    const { id } = useParams()
    const studentId = Number(id)

    const student = students.find((student) => student.id === studentId)

    const [firstName, setFirstName] = useState(student?.firstName ?? '')
    const [lastName, setLastName] = useState(student?.lastName ?? '')
    const [email, setEmail] = useState(student?.email ?? '')
    const [gpa, setGpa] = useState(student?.gpa.toString() ?? '')
    const [campusId, setCampusId] = useState(student?.campusId?.toString() ?? '')
    const [errorMessage, setErrorMessage] = useState('')

    if (!student) {
        return (
            <div className="content-section">
                <div className="section-heading">
                    <p>Edit Student</p>
                    <h2>Student not found</h2>
                </div>

                <Button asChild>
                    <Link to="/students">Back to Students</Link>
                </Button>
            </div>
        )
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage('')

        const gpaNumber = Number(gpa)

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !gpa.trim()) {
            setErrorMessage('Please fill out first name, last name, email, and GPA.')
            return
        }

        if (gpaNumber < 0 || gpaNumber > 4) {
            setErrorMessage('GPA must be between 0.0 and 4.0.')
            return
        }

        const updatedStudent = {
            id: studentId,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            gpa: gpaNumber,
            campusId: campusId ? Number(campusId) : null,
        }

        console.log('Updated student:', updatedStudent)
        alert('Student update submitted. Backend connection will be added later.')
    }

    return (
        <div className="content-section">
            <Button asChild variant="outline">
                <Link to={`/students/${student.id}`}>Back to Student Details</Link>
            </Button>

            <Card className="form-card">
                <CardHeader>
                    <CardDescription>Edit Student</CardDescription>
                    <CardTitle>
                        {student.firstName} {student.lastName}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="app-form" onSubmit={handleSubmit}>
                        <label>
                            First Name
                            <input
                                type="text"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </label>

                        <label>
                            Last Name
                            <input
                                type="text"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>

                        <label>
                            GPA
                            <input
                                type="number"
                                min="0"
                                max="4"
                                step="0.1"
                                value={gpa}
                                onChange={(event) => setGpa(event.target.value)}
                            />
                        </label>

                        <label>
                            Campus
                            <select
                                value={campusId}
                                onChange={(event) => setCampusId(event.target.value)}
                            >
                                <option value="">Not enrolled</option>
                                {campuses.map((campus) => (
                                    <option key={campus.id} value={campus.id}>
                                        {campus.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <Button type="submit">Save Student</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditStudentPage