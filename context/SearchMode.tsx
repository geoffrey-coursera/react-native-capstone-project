export { SearchModeProvider, useSearchMode };

import { useFilter } from "@/hooks/useFilter";
import { useSwipe } from "@/hooks/useSwipe";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import { BackHandler, Keyboard } from "react-native";

type SearchMode = false | 'swipe' | 'category' | 'searchBar';

const SearchContext = createContext({
    searchMode: false as SearchMode,
    setSearchMode: (_: SearchMode) => {},
    onSearch: (_: string) => {},
    onSelect: (_: string) => {},
    query: '',
    setQuery: (_: string) => {},
    filters: [] as string[],
    exitSearchMode: () => {}
});

const useSearchMode = () => {
    const context = useContext(SearchContext);

    const allowExit = useRef(true);

    const swipeHandlers = useSwipe({
        up: () => context.setSearchMode('swipe'),
        down: () => allowExit.current && context.exitSearchMode()
    });

    return { ...context, swipeHandlers, allowExit };
}

const SearchModeProvider = ({ children }: { children: ReactNode }) => {
    const [searchMode, setSearchMode] = useState<SearchMode>(false);
    const { onSearch, onSelect, query, setQuery, filters } = useFilter();

    const exitSearchMode = () => {
        setSearchMode(false);
        Keyboard.dismiss()
    }
    
    const value = {
        searchMode,
        setSearchMode,
        query,
        setQuery,
        filters, 
        onSearch,
        exitSearchMode,
        onSelect: (name: string) => {
            setSearchMode('category');
            onSelect(name);
        }
    };

    useEffect(() => {
        const handleBackPress = () => {
            if (searchMode) {
                exitSearchMode()
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