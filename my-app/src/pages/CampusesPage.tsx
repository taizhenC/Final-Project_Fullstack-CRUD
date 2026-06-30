import CampusCard from '@/components/CampusCard'
import { campuses } from '@/data/mockData'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function CampusesPage() {
    return (
        <section className="content-section">
            <div className="directory-header">
                <div>
                    <h2>Campus Directory</h2>
                    <p className="directory-description">
                        Explore campus profiles, addresses, and enrollment details across all schools.
                    </p>
                </div>

                <div className="directory-summary">
                    <span>{campuses.length}</span>
                    <p>Campuses Available</p>
                </div>
            </div>

            <div className="page-actions">
                <Button asChild>
                    <Link to="/campuses/new">Add Campus</Link>
                </Button>
            </div>

            <div className="card-grid">
                {campuses.map((campus) => (
                    <CampusCard
                        key={campus.id}
                        name={campus.name}
                        address={campus.address}
                        imageUrl={campus.imageUrl}
                        description={campus.description}
                        id={campus.id}
                    />
                ))}
            </div>
        </section>
    )
}

export default CampusesPage