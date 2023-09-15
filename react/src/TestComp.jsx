import React, { useState, useEffect } from 'react';

function TestComp({ text, onClick }) {
    const [userData, setUserData] = useState(null);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        // API call to fetch user data
        fetch('https://api.example.com/user')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching user data:', error));

        // API call to fetch user's posts
        fetch('https://api.example.com/posts')
            .then(response => response.json())
            .then(data => setPostList(data))
            .catch(error => console.error('Error fetching user posts:', error));
    }, []);

    return (
        <div>
            {
                userData ? (
                    <div>
                        <h2>{userData.name}</h2>
                        <p>Email: {userData.email}</p>
                    </div>
                ) : <div>Loading...</div>
            }

            <ul>
                {postList.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>

            <button onClick={onClick}>{text}</button>
        </div>
    );
}

export default TestComp;