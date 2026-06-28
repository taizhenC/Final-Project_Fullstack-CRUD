import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

function AddCampusPage() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage('')

        if (!name.trim() || !address.trim() || !description.trim()) {
            setErrorMessage('Please fill out name, address, and description.')
            return
        }

        const newCampus = {
            name: name.trim(),
            address: address.trim(),
            imageUrl: imageUrl.trim(),
            description: description.trim(),
        }

        console.log('New campus:', newCampus)
        setErrorMessage('')
        alert('Campus form submitted. Backend connection will be added later.')

        setName('')
        setAddress('')
        setImageUrl('')
        setDescription('')
    }

    return (
        <div className="content-section">
            <Button asChild variant="outline">
                <Link to="/campuses">Back to Campuses</Link>
            </Button>

            <Card className="form-card">
                <CardHeader>
                    <CardDescription>New Campus</CardDescription>
                    <CardTitle>Add a Campus</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="app-form" onSubmit={handleSubmit}>
                        <label>
                            Campus Name
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Hunter College"
                            />
                        </label>

                        <label>
                            Address
                            <input
                                type="text"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                placeholder="695 Park Ave, New York, NY"
                            />
                        </label>

                        <label>
                            Image URL
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(event) => setImageUrl(event.target.value)}
                                placeholder="https://example.com/campus.jpg"
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Write a short campus description."
                            />
                        </label>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <Button type="submit">Add Campus</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCampusPage