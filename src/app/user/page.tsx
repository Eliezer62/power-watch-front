'use client'
import Menu from "@/components/ui/menu";
import TableUser from "./table";
import { useEffect, useState } from "react";


export default function User() {
    const [darkMode, setDarkMode] = useState(false);
        
        useEffect(() => {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
            setDarkMode(prefersDarkMode.matches);
    
            const handleChange = (event: MediaQueryListEvent) => {
                setDarkMode(event.matches);
              };
          
              prefersDarkMode.addEventListener('change', handleChange);
        }, []);
        
    return (
        <div className={(darkMode?"dark":"") + " dark:bg-neutral-800 min-h-[100vh]"}>
            <Menu/>
            <div className="flex items-center w-[100vw] h-[75px] bg-white dark:bg-neutral-700">
                <h1 className="ml-[100px] text-3xl dark:text-white">Usuários</h1>
            </div>
            
            <TableUser />
        </div>
    )
}