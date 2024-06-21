import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

const updateFilters = (name: string) => (filters: string[]) => {
    const index = filters.indexOf(name);

    return (index === -1)
        ? filters.concat(name)
        : filters.slice(0, index).concat(filters.slice(index + 1));
}


export const useFilter = (onFilter: (query: string, filters: string[]) => void) => {
    const [query, setQuery] = useState<string>('');
    const [filters, setFilters] = useState<string[]>([]);

    const onSearch = useCallback(debounce((query: string) => {
        setQuery(query)
    }, 500), []);

    const onSelect = useCallback((name: string) => {
        setFilters(updateFilters(name));
    }, [filters]);

    useUpdateEffect(() => {
        onFilter(query, filters)
    }, [query, filters]);

    return { onSearch, onSelect }
}