// import axios from 'axios';
// const showDataConsole = () => {
export  const BASE_URL = 'https://66d8421437b1cadd80540530.mockapi.io/';


//     interface User {
//         id?: string;
//         firstname: string;
//         password: string;
//         country: string;
//         lastname: string;
//     }

//     const getUsers = async (): Promise<User[]> => {
//         const response = await axios.get<User[]>(`${BASE_URL}/users`);
//         return response.data;
//     };

//     const getUserById = async (id: string): Promise<User> => {
//         const response = await axios.get<User>(`${BASE_URL}/users/${id}`);
//         return response.data;
//     };

//     const createUser = async (user: User): Promise<User> => {
//         const response = await axios.post<User>(`${BASE_URL}/users`, user);
//         return response.data;
//     };

//     const updateUser = async (id: string, user: User): Promise<User> => {
//         const response = await axios.put<User>(`${BASE_URL}/users/${id}`, user);
//         return response.data;
//     };

//     // const deleteUser = async (id: string): Promise<void> => {
//     //     await axios.delete<void>(`${BASE_URL}/users/${id}`);
//     // };

//     const runExample = async () => {
//         try {
   
//             const newUser: User = {
//                 firstname: 'John',
//                 password: 'password123',
//                 country: 'USA',
//                 lastname: 'Doe'
//             };
//             const createdUser = await createUser(newUser);
//             console.log('Created User:', createdUser);

    
//             const users = await getUsers();
//             console.log('All Users:', users);

    
//             if (createdUser.id) {
//                 const user = await getUserById(createdUser.id);
//                 console.log('User by ID:', user);


//                 const updatedUser: User = {
//                     ...user,
//                     firstname: 'Jane'
//                 };
//                 const updated = await updateUser(createdUser.id, updatedUser);
//                 console.log('Updated User:', updated);

      
//                 // await deleteUser(createdUser.id);
//                 // console.log('User Deleted');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//     runExample();
// }
// export default showDataConsole
