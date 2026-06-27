import StudentCard from '@/components/StudentCard'
import { campuses, students } from '@/data/mockData'

function StudentsPage() {
    return (
        <section className="content-section">
            <div className="section-heading">
                <p>Students</p>
                <h2>Student directory</h2>
            </div>

            <div className="card-grid">
                {students.map((student) => {
                    const campus = campuses.find((campus) => campus.id === student.campusId)

                    return (
                        <StudentCard
                            key={student.id}
                            firstName={student.firstName}
                            lastName={student.lastName}
                            email={student.email}
                            gpa={student.gpa}
                            campusName={campus?.name}
                            id={student.id}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export default StudentsPage