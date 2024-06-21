export { SearchModeProvider, useSearchMode };

import { useFilter } from "@/hooks/useFilter";
import { useSwipe } from "@/hooks/useSwipe";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";

type SearchMode = false | 'swipe' | 'category' | 'searchBar';

const SearchContext = createContext({
    isSearchMode: false as SearchMode,
    setIsSearchMode: (_: SearchMode) => {},
    searchText: '',
    setSearchText: (_: string) => {},
    onSearch: (_: string) => {},
    onSelect: (_: string) => {},
    query: '',
    filters: [] as string[]
});

const useSearchMode = () => {
    const context = useContext(SearchContext);

    const hasReachedTop = useRef(true);

    const swipeHandlers = useSwipe({
        up: () => context.setIsSearchMode('swipe'),
        down: () => hasReachedTop.current && context.setIsSearchMode(false)
    });

    return { ...context, swipeHandlers, hasReachedTop };
}

const SearchModeProvider = ({ children }: { children: ReactNode }) => {
    const [isSearchMode, setIsSearchMode] = useState<SearchMode>(false);
    const [searchText, setSearchText] = useState('');
    const { onSearch, onSelect, query, filters } = useFilter();

    const value = {
        isSearchMode,
        setIsSearchMode,
        searchText,
        setSearchText,
        query,
        filters, 
        onSearch,
        onSelect: (name: string) => {
            setIsSearchMode('category');
            onSelect(name);
        }
    };

    useEffect(() => {
        const handleBackPress = () => {
            if (isSearchMode) {
                setIsSearchMode(false);
                return true;
            }
            return false;
        };
        
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [isSearchMode]);
  
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};