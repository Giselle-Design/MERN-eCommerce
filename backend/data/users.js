import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Dua Lipa',
        email: 'lipa@example.com',
        password: bcrypt.hashSync('123456', 10),
     
    },
    {
        name: 'Carlos Mike',
        email: 'mike@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
]

export default users