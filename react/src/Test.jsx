import { useEffect } from "react"

export default function Test({ name }) {
    useEffect(() => {
        console.log("hi", name)
    }, [name]);

    return (
        <div>hi {name}</div>
    )
}