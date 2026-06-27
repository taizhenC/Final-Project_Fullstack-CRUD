import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

type CampusCardProps = {
    name: string
    address: string
    imageUrl: string
    description: string
}

function CampusCard({
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

            <CardContent>
                <p>{description}</p>
            </CardContent>
        </Card>
    )
}

export default CampusCard