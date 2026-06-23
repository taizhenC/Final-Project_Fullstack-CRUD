export const campuses = [
  {
    id: 1,
    name: 'Hunter College',
    address: '695 Park Ave, New York, NY',
    imageUrl:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    description:
      'A public college in Manhattan with a strong computer science program.',
  },
  {
    id: 2,
    name: 'Brooklyn College',
    address: '2900 Bedford Ave, Brooklyn, NY',
    imageUrl:
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
    description:
      'A campus known for its open quad, academic programs, and student community.',
  },
  {
    id: 3,
    name: 'Queens College',
    address: '65-30 Kissena Blvd, Queens, NY',
    imageUrl:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80',
    description:
      'A large campus with a diverse student body and many academic departments.',
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