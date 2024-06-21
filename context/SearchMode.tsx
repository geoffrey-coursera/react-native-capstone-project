export { SearchModeProvider, useSearchMode };

import { useFilter } from "@/hooks/useFilter";
import { useSwipe } from "@/hooks/useSwipe";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";

type SearchMode = false | 'swipe' | 'category' | 'searchBar';

const SearchContext = createContext({
    searchMode: false as SearchMode,
    setSearchMode: (_: SearchMode) => {},
    onSearch: (_: string) => {},
    onSelect: (_: string) => {},
    query: '',
    setQuery: (_: string) => {},
    filters: [] as string[]
});

const useSearchMode = () => {
    const context = useContext(SearchContext);

    const hasReachedTop = useRef(true);

    const swipeHandlers = useSwipe({
        up: () => context.setSearchMode('swipe'),
        down: () => hasReachedTop.current && context.setSearchMode(false)
    });

    return { ...context, swipeHandlers, hasReachedTop };
}

const SearchModeProvider = ({ children }: { children: ReactNode }) => {
    const [searchMode, setSearchMode] = useState<SearchMode>(false);
    const { onSearch, onSelect, query, setQuery, filters } = useFilter();

    const value = {
        searchMode,
        setSearchMode,
        query,
        setQuery,
        filters, 
        onSearch,
        onSelect: (name: string) => {
            setSearchMode('category');
            onSelect(name);
        }
    };

    useEffect(() => {
        const handleBackPress = () => {
            if (searchMode) {
                setSearchMode(false);
                return true;
            }
            return false;
        };
        
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [searchMode]);
  
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};