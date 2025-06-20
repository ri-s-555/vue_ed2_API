// import { MOCK_CARTS } from './controlers/carts';

export interface IUser {
    id: number
    name: string
    email: string
    cartId: number
    balance: number
}

export const MOCK_USERS = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        cartId: 1,
        balance: 100,
    },
        {
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        cartId: 2,
        balance: 120,
    },
]


