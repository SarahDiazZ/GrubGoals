import React, { useState } from 'react';
import '../css/SettingsNavBar.css';

export default function SettingsNavBar({activeSection, onSelectSection}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const sections = ["Account", "Dietary Preferences", "Calorie Intake", "Dark Mode"];

    const toggleDarkMode= () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className={`settings-navbar ${isDarkMode ? 'dark': ''}`}>
            <ul>
                {sections.map((section) => (
                    <li
                        key={section}
                        className={activeSection === section ? "active" : ""}
                        onClick={() => onSelectSection(section)}
                    >
                        {section}
                    </li>
                ))}
            </ul>

            {/* Dark Mode Toggle */}
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </nav>
    );
} //end function