import React from 'react';
import Approutes from './Approutes';
import ThemeToggle from './components/ThemeToggle';
import { ToastProvider } from './context/ToastContext';
import './index.css';

function App() {
    return (
        <ToastProvider>
            <ThemeToggle />
            <Approutes />
        </ToastProvider>
    );
}

export default App;
