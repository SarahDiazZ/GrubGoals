import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SettingsNavBar.css';

export default function SettingsNavBar({activeSection, onSelectSection, isDarkMode, toggleDarkMode}) {
    const sections = ["Account", "Dietary Preferences", "Calorie Intake", "Toggle Dark Mode", "Dashboard"];
    const navigate = useNavigate();

    return (
        <nav className={`settings-navbar ${isDarkMode ? 'dark': ''}`}>
            <ul>
                {sections.map((section) => (
                    <li
                        key={section}
                        className={activeSection === section ? "active" : ""}
                        onClick={() => {
                            if (section === "Toggle Dark Mode") {
                                toggleDarkMode(); // Toggle dark mode when clicking "Dark Mode"
                            } else if (section === "Dashboard") {
                                navigate('/dashboard'); // Redirect to the dashboard
                            } 
                            else {
                                onSelectSection(section); // Handle other sections
                            }
                        }}
                    >
                        {section === "Toggle Dark Mode" ? (
                            isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"
                        ) : (
                            section
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
} //end function