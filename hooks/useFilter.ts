import debounce from "lodash.debounce";
import { useCallback, useState } from "react";


const updateFilters = (name: string) => (filters: string[]) => {
    const index = filters.indexOf(name);

    return (index === -1)
        ? filters.concat(name)
        : filters.slice(0, index).concat(filters.slice(index + 1));
}


export const useFilter = () => {
    const [query, setQuery] = useState<string>('');
    const [filters, setFilters] = useState<string[]>([]);

    const onSearch = useCallback(debounce((query: string) => {
        setQuery(query)
    }, 200), []);

    const onSelect = useCallback((name: string) => {
        setFilters(updateFilters(name));
    }, [filters]);

    return { onSearch, onSelect, query, setQuery, filters }
}