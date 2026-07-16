export default function useDebounce(value, delay) {
    const [debVal, setDebVal] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebVal(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debVal;
}
