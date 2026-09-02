import axios from "axios";
import { useState, useEffect } from "react";

const Form = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState(null);

    const api =
        "https://6a95fe44fa33b37f821b05ec.mockapi.io/api/v1/users";


    // Add User
    const add = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("file", avatar);
            formData.append("upload_preset", "react_upload");

            const cloudinaryResponse = await axios.post(
                "https://api.cloudinary.com/v1_1/dzjx6vlmy/image/upload",
                formData
            );

            const imageURL = cloudinaryResponse.data.secure_url;

            const addPicture = await axios.post(api, {
                name: name,
                avatar: imageURL
            });

            const newUser = addPicture.data;

            setUsers((prevUsers) => [
                ...prevUsers,
                newUser
            ]);

            alert("Uplaod has been Succesfully")

        } catch (error) {
            console.log(error);
            alert("Uplaod has been Failed")

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* =========================
                Add User Form
            ========================= */}

            <form
                onSubmit={add}
                className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md mb-10"
            >

                <h1 className="text-2xl font-bold mb-5">
                    Add New User
                </h1>

                {/* Name */}

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-black"
                />

                {/* Image */}

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        setAvatar(e.target.files[0]);
                    }}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                />

                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-xl 
               hover:bg-gray-800 
               disabled:bg-gray-400 
               disabled:cursor-not-allowed"
                >
                    {loading ? "Uploading..." : "Add User"}
                </button>

            </form>


        </div>
    );
};

export default Form;