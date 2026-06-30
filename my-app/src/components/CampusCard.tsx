import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type CampusCardProps = {
    id: number
    name: string
    address: string
    imageUrl: string
    description: string
}

function CampusCard({
    id,
    name,
    address,
    imageUrl,
    description,
}: CampusCardProps) {
    return (
        <Card className="campus-card">
            <img src={imageUrl} alt={name} className="campus-card-image" />

            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{address}</CardDescription>
            </CardHeader>

            <CardContent className="campus-card-content">
                <p>{description}</p>
                <Button asChild variant="outline" className="campus-card-button">
                    <Link to={`/campuses/${id}`}>View Details</Link>
                </Button>
            </CardContent>
        </Card>
    )
}

export default CampusCard