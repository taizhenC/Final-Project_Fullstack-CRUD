import hunterImage from '@/assets/campuses/hunter.jpg'
import brooklynImage from '@/assets/campuses/brooklyn.jpg'
import queensImage from '@/assets/campuses/queens.jpg'

export const campuses = [
  {
    id: 1,
    name: 'Hunter College',
    address: '695 Park Ave, New York, NY',
    imageUrl: hunterImage,
    description:
      'Hunter College is a public university in New York City, United States. It is one of the constituent colleges of the City University of New York, and offers studies in more than one hundred undergraduate and postgraduate fields across five schools.',
  },
  {
    id: 2,
    name: 'Brooklyn College',
    address: '2900 Bedford Ave, Brooklyn, NY',
    imageUrl: brooklynImage,
    description:
      'Brooklyn College is a public university in Brooklyn in New York City, New York. It is part of the City University of New York system and enrolled nearly 14,000 students on a 35-acre campus in the Midwood and Flatbush sections of Brooklyn as of fall 2023.',
  },
  {
    id: 3,
    name: 'Queens College',
    address: '65-30 Kissena Blvd, Queens, NY',
    imageUrl: queensImage,
    description:
      'Queens College is a public college in the New York City borough of Queens. Part of the City University of New York system, Queens College occupies an 83-acre campus primarily located in Flushing.',
  },
]

export const students = [
  {
    id: 1,
    firstName: 'Mina',
    lastName: 'Chen',
    email: 'mina.chen@example.com',
    gpa: 3.7,
    campusId: 1,
  },
  {
    id: 2,
    firstName: 'Jason',
    lastName: 'Lee',
    email: 'jason.lee@example.com',
    gpa: 3.2,
    campusId: 2,
  },
  {
    id: 3,
    firstName: 'Ava',
    lastName: 'Smith',
    email: 'ava.smith@example.com',
    gpa: 3.9,
    campusId: null,
  },
]