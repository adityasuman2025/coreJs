import { useState, useEffect } from "react";

const TYPE_FOLDER = "folder", TYPE_FILE = "file";
const MOCK = [
    {
        title: "public 1",
        type: TYPE_FOLDER,
        content: [
            {
                title: "public 1.1",
                type: TYPE_FOLDER,
                content: [
                    {
                        title: "public 1.1 file 1",
                        type: TYPE_FILE,
                    },
                    {
                        title: "public 1.1 file 2",
                        type: TYPE_FILE,
                    },
                ],
            },
        ],
    },
    {
        title: "public 2",
        type: TYPE_FOLDER,
        content: [
            {
                title: "public2 file 1",
                type: TYPE_FILE,
            },
            {
                title: "public2 file 2",
                type: TYPE_FILE,
            },
        ],
    },
];

export default function KeyboardAccessibility() {
    const [openFolders, setOpenFolders] = useState([]);

    function handleClick(e, key) {
        e.stopPropagation();
        setOpenFolders((prev) => {
            if (prev.includes(key)) return prev.filter((item) => item !== key);
            return [...prev, key];
        });
    }

    useEffect(() => {
        document.addEventListener("keyup", handleKeyDown);
        return () => document.removeEventListener("keyup", handleKeyDown);
    }, [])

    function handleKeyDown(e) {
        const items = Array.from(document.querySelectorAll(".list-item-title"));
        const currentIndex = items.indexOf(document.activeElement);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            items[(currentIndex + 1) % items.length]?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            items[(currentIndex - 1 + items.length) % items.length]?.focus();
        } else if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            document.activeElement?.click();
        }
    };

    function render(struct, parentKey) {
        if (!struct?.length) return null;

        return struct.map((item, idx) => {
            const key = (parentKey ? parentKey + "_" : "") + idx;

            return (
                <li key={key} className={"list-item " + (item.type === TYPE_FILE ? "file" : "")}>
                    <div
                        tabIndex={0}
                        onClick={item.type === TYPE_FILE ? null : (e) => handleClick(e, key)}
                        className="list-item-title"
                    >
                        {item.title}
                    </div>
                    {openFolders.includes(key) && (
                        <ul className="list">{render(item.content, key)}</ul>
                    )}
                </li>
            );
        });
    }

    return (
        <ul className="list">
            {render(MOCK, "")}
        </ul>
    );
}
