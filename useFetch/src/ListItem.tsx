import { memo } from 'react';

interface ListItemProps {
    name: string;
    price: number;
    thumbnail: string;
}
function ListItem({ name, price, thumbnail }: ListItemProps) {
    return (
        <li>
            <div>{name}</div>
            <div>{price}</div>
            <img src={thumbnail} alt="product image" />
        </li>
    );
};
export default memo(ListItem);