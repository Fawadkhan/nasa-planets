export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const users = new Map<number, User>();

const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'password'
};

users.set(user.id, user);
