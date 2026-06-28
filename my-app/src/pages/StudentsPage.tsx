import StudentCard from '@/components/StudentCard'
import { campuses, students } from '@/data/mockData'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useStudentFilterStore } from '@/stores/studentFilterStore'

function StudentsPage() {
    const { selectedCampusId, setSelectedCampusId } = useStudentFilterStore()

    const filteredStudents = students.filter((student) => {
        if (selectedCampusId === 'all') {
            return true
        }

        if (selectedCampusId === 'none') {
            return student.campusId === null
        }

        return student.campusId === Number(selectedCampusId)
    })

    return (
        <section className="content-section">
            <div className="section-heading">
                <p>Students</p>
                <h2>Student directory</h2>
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
            </div>

            {filteredStudents.length > 0 ? (
                <div className="card-grid">
                    {filteredStudents.map((student) => {
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