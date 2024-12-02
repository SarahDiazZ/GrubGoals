import React from 'react';
import '../css/SettingsNavBar.css';

export default function SettingsNavBar({activeSection, onSelectSection}) {
    const sections = ["Account", "Dietary Preferences", "Activity Settings", "Display Preferences"];

    return (
        <nav className="settings-navbar">
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
        </nav>
    );
} //end function