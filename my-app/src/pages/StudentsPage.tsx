import StudentCard from '@/components/StudentCard'
import { campuses, students } from '@/data/mockData'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useStudentFilterStore } from '@/stores/studentFilterStore'
import { useState } from 'react'

function StudentsPage() {
    const { selectedCampusId, setSelectedCampusId } = useStudentFilterStore()
    const [sortOption, setSortOption] = useState('lastName')

    const filteredStudents = students.filter((student) => {
        if (selectedCampusId === 'all') {
            return true
        }

        if (selectedCampusId === 'none') {
            return student.campusId === null
        }

        return student.campusId === Number(selectedCampusId)
    })

    const sortedStudents = [...filteredStudents].sort((a, b) => {
        if (sortOption === 'firstName') {
            return a.firstName.localeCompare(b.firstName)
        }

        if (sortOption === 'gpaHigh') {
            return b.gpa - a.gpa
        }

        if (sortOption === 'gpaLow') {
            return a.gpa - b.gpa
        }

        return a.lastName.localeCompare(b.lastName)
    })

    const selectedCampusName =
        selectedCampusId === 'all'
            ? 'All campuses'
            : selectedCampusId === 'none'
                ? 'Not enrolled'
                : campuses.find((campus) => campus.id === Number(selectedCampusId))?.name

    return (
        <section className="content-section">
            <div className="directory-header">
                <div>
                    <h2>Student Directory</h2>
                    <p className="directory-description">
                        Browse student profiles, filter by campus, and sort the roster.
                    </p>
                </div>

                <div className="directory-summary">
                    <p>Filtered Students </p>
                    <span>{sortedStudents.length}</span>
                    <p>{selectedCampusName}</p>
                </div>
            </div>

            <div className="page-actions">
                <Button asChild>
                    <Link to="/students/new">Add Student</Link>
                </Button>
            </div>

            <div className="filter-bar">
                <label>
                    Filter by campus
                    <select
                        value={selectedCampusId}
                        onChange={(event) => setSelectedCampusId(event.target.value)}
                    >
                        <option value="all">All Students</option>
                        <option value="none">Not enrolled</option>
                        {campuses.map((campus) => (
                            <option key={campus.id} value={campus.id}>
                                {campus.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className="filter-kicker">Secondary filter</span>
                    <span className="filter-title">Sort students</span>
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                    >
                        <option value="lastName">Last name A-Z</option>
                        <option value="firstName">First name A-Z</option>
                        <option value="gpaHigh">Highest GPA first</option>
                        <option value="gpaLow">Lowest GPA first</option>
                    </select>
                </label>
            </div>

            {sortedStudents.length > 0 ? (
                <div className="card-grid">
                    {sortedStudents.map((student) => {
                        const campus = campuses.find((campus) => campus.id === student.campusId)

                        return (
                            <StudentCard
                                key={student.id}
                                firstName={student.firstName}
                                lastName={student.lastName}
                                email={student.email}
                                gpa={student.gpa}
                                campusName={campus?.name ?? 'Not enrolled'}
                                id={student.id}
                            />
                        )
                    })}
                </div>
            ) : (
                <p className="empty-message">No students match this filter.</p>
            )
            }
        </section>
    )
}

export default StudentsPage