import React, { useState, useEffect, useRef } from 'react';
import './SideBar.css';
import StartForm from '../StartForm/StartForm.jsx';
import Calculator from '../Calculator/Calculator.jsx';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activePage, setActivePage] = useState('start');
    const sidebarRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setIsOpen(!mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobile &&
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isOpen]);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        }
    };

    const handleMenuClick = (page) => {
        setActivePage(page);
        if (isMobile) {
            setIsOpen(false);
        }
    };

    const renderContent = () => {
        switch (activePage) {
            case 'start':
                return <StartForm />;
            case 'calculator':
                return <Calculator />;
            default:
                return <StartForm />;
        }
    };

    return (
        <div className="sidebar-container">
            {isMobile && (
                <button
                    className={`sidebar-toggle ${isOpen ? 'hidden' : ''}`}
                    onClick={toggleSidebar}
                >
                    ☰ Меню
                </button>
            )}

            {isMobile && isOpen && (
                <div className="backdrop" onClick={() => setIsOpen(false)} />
            )}

            <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <button
                                className={activePage === 'start' ? 'active' : ''}
                                onClick={() => handleMenuClick('start')}
                            >
                                Start Form
                            </button>
                        </li>
                        <li>
                            <button
                                className={activePage === 'calculator' ? 'active' : ''}
                                onClick={() => handleMenuClick('calculator')}
                            >
                                Calculator
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default SideBar;