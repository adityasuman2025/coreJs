import { useCallback, memo } from "react";

function ListItem({ item, onDeleteClick }: { item: string, onDeleteClick: (item: string) => void }) {
    console.log("ListItem Re-rendered", item);

    const handleClick = useCallback(() => {
        onDeleteClick(item);
    }, [item, onDeleteClick]);

    return (
        <li>
            <span>{item}</span>
            <button onClick={handleClick}>Delete</button>
        </li>
    );
};

export default memo(ListItem);