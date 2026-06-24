import { useState, useCallback } from 'react';
import InputBox from './InputBox';
import ListItem from './ListItem';
import useFetch from "./useFetch";

const API = 'https://dummyjson.com/products/search?q=';

export default function App() {
    const [query, setQuerty] = useState<string>('');
    const [products, setProducts] = useState([]);

    const [isLoading, error] = useFetch({
        endpoint: API + query,
        depdncy: query,
        enabled: query.trim() !== "",
        retryLimit: 3,
        onSuccess: (data) => setProducts(data.products)
    });

    const handleChange = useCallback((qry) => {
        setQuerty(qry);
    }, []);

    return (
        <main>
            <InputBox onChange={handleChange} />

            {isLoading ? (
                'loader'
            ) : error ? (
                error
            ) : query && products.length === 0 ? (
                'no result found'
            ) : (
                <>
                    {products.map((product) => (
                        <ListItem
                            key={product.id}
                            name={product.title}
                            price={product.price}
                            thumbnail={product.thumbnail}
                        />
                    ))}
                </>
            )}
        </main>
    );
}