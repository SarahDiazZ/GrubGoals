import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const DarkModeContext = createContext();

// Provider component
export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize dark mode from localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === null) {
            // If no saved mode, default to light mode
            localStorage.setItem('darkMode', 'false');
            setIsDarkMode(false);
        } else {
            setIsDarkMode(savedMode === 'true');
        }
    }, []);

    // Toggle dark mode and save to localStorage
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Custom hook for consuming the context
export const useDarkMode = () => useContext(DarkModeContext);
