import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);

    const api = "https://6a95fe44fa33b37f821b05ec.mockapi.io/api/v1/users"

    const getUsers = () => {
        axios.get(api)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const channel = new BroadcastChannel("users_channel");

        channel.onmessage = (event) => {
            if (event.data.type === "USER_ADDED") {
                getUsers();
            }
        };

        return () => {
            channel.close();
        };
    }, [])

   



    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <Link to="/form">New User</Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex flex-col items-center text-center">

                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm mb-4"
                            />

                            <h2 className="text-xl font-bold text-gray-800">
                                {user.name}
                            </h2>

                            <p className="text-gray-500 text-sm mt-1">
                                User ID: {user.id}
                            </p>

                            <button
                                className="mt-5 w-full bg-black text-white py-2.5 rounded-xl
                            hover:bg-gray-800 active:scale-95 transition-all duration-200"
                            >
                                View Profile
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home