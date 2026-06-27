import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { campuses } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function AddStudentPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [gpa, setGpa] = useState('')
  const [campusId, setCampusId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

    const newStudent = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      imageUrl: imageUrl.trim(),
      gpa: gpaNumber,
      campusId: campusId ? Number(campusId) : null,
    }

    console.log('New student:', newStudent)
    alert('Student form submitted. Backend connection will be added later.')

    setFirstName('')
    setLastName('')
    setEmail('')
    setImageUrl('')
    setGpa('')
    setCampusId('')
  }

  return (
    <div className="content-section">
      <Button asChild variant="outline">
        <Link to="/students">Back to Students</Link>
      </Button>

      <Card className="form-card">
        <CardHeader>
          <CardDescription>New Student</CardDescription>
          <CardTitle>Add a Student</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="app-form" onSubmit={handleSubmit}>
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Mina"
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Chen"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="mina.chen@example.com"
              />
            </label>

            <label>
              Image URL
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://example.com/student.jpg"
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
                placeholder="3.7"
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

            <Button type="submit">Add Student</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddStudentPage