import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'xinzhe',
        email: 'xinzhe@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: 'yuka',
        email: 'yuka@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    }
]

export default users