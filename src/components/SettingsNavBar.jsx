import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/SettingsNavBar.css';

export default function SettingsNavBar({activeSection, onSelectSection, isDarkMode, toggleDarkMode}) {
    const sections = ["Account", "Dietary Preferences", "Calorie Intake", "Toggle Dark Mode", "Dashboard"];
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(useLocation().search)
    let userID = urlParams.get("userID")
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
                                navigate(`/dashboard?userID=${userID}`); // Redirect to the dashboard
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