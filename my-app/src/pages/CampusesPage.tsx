import CampusCard from '@/components/CampusCard'
import { campuses } from '@/data/mockData'

function CampusesPage() {
    return (
        <section className="content-section">
            <div className="section-heading">
                <p>Campuses</p>
                <h2>Campus directory</h2>
            </div>

            <div className="card-grid">
                {campuses.map((campus) => (
                    <CampusCard
                        key={campus.id}
                        name={campus.name}
                        address={campus.address}
                        imageUrl={campus.imageUrl}
                        description={campus.description}
                    />
                ))}
            </div>
        </section>
    )
}

export default CampusesPage