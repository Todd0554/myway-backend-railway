import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: 'xinzhey',
        email: 'xinzhey@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: 'yuka',
        email: 'yuka@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: 'todd',
        email: 'todd@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    },
    {
        name: 'xinzhe',
        email: 'xinzhe@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    }

]

export default users