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

// _id: $oid":"59b99db4cfa9a34dcd7885b6
// name: Ned Stark
// email:  sean_bean@gameofthron.es
// password:
// $2a$12$zMb1y8pyPoiE36bgrTJ.oerf6tM3cr1qDWbY23cO7T/BZz2TXiO.2
// 12345qqq