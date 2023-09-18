import react, { useEffect, useState } from "react";

/*
    Higher-Order Component is basically a function that takes a component as an argument and returns a new component with additional props or functionality.
    It is used to enhance the functionality of a component by wrapping it with another component. HOCs are a way to reuse code logic and add additional features to a component without modifying the component itself.
    By extracting common logic into a HOC, we can reuse that logic across multiple components. This promotes code reusability and reduces duplication. It also promotes separation of concerns by allowing you to keep certain functionalities separate from the main component.
    HOCs are commonly used for tasks like authentication and authorization. They can check if a user is authenticated and conditionally render components based on their authentication status.
*/

// this component check the authentication status before rendering the given component
export default function hoc(WrappedComponent) {
    return function(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) setIsAuthenticated(true);
        }, []);

        return (
            <>
                {
                    isAuthenticated ? <WrappedComponent {...props} />
                        : <div>Please log in to access this component.</div>
                }
            </>
        )
    }
}