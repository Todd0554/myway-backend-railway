import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: 'todd',
        email: 'todd@example.com',
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: 'xinzhe',
        email: 'xinzhe@example.com',
        password: bcrypt.hashSync("123456", 10),
    },
]

export default users