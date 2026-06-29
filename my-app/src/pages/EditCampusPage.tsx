import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { campuses } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

function EditCampusPage() {
    const { id } = useParams()
    const campusId = Number(id)

    const campus = campuses.find((campus) => campus.id === campusId)

    const [name, setName] = useState(campus?.name ?? '')
    const [address, setAddress] = useState(campus?.address ?? '')
    const [imageUrl, setImageUrl] = useState(campus?.imageUrl ?? '')
    const [description, setDescription] = useState(campus?.description ?? '')
    const [errorMessage, setErrorMessage] = useState('')

    if (!campus) {
        return (
            <div className="content-section">
                <div className="section-heading">
                    <p>Edit Campus</p>
                    <h2>Campus not found</h2>
                </div>

                <Button asChild>
                    <Link to="/campuses">Back to Campuses</Link>
                </Button>
            </div>
        )
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage('')

        if (!name.trim() || !address.trim() || !description.trim()) {
            setErrorMessage('Please fill out name, address, and description.')
            return
        }

        const updatedCampus = {
            id: campusId,
            name: name.trim(),
            address: address.trim(),
            imageUrl: imageUrl.trim(),
            description: description.trim(),
        }

        console.log('Updated campus:', updatedCampus)
        alert('Campus update submitted. Backend connection will be added later.')
    }

    return (
        <div className="content-section">
            <Button asChild variant="outline">
                <Link to={`/campuses/${campus.id}`}>Back to Campus Details</Link>
            </Button>

            <Card className="form-card">
                <CardHeader>
                    <CardDescription>Edit Campus</CardDescription>
                    <CardTitle>{campus.name}</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="app-form" onSubmit={handleSubmit}>
                        <label>
                            Campus Name
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </label>

                        <label>
                            Address
                            <input
                                type="text"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </label>

                        <label>
                            Image URL
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(event) => setImageUrl(event.target.value)}
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </label>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <Button type="submit">Save Campus</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCampusPage