'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password.input";
import { useEffect, useState } from "react";


export default function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(prefersDarkMode.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            console.log("Foi");
            setDarkMode(event.matches);
          };
      
          prefersDarkMode.addEventListener('change', handleChange);
    }, []);

    return (
        <div className= {(darkMode?"dark":"") + " dark:bg-neutral-800 min-h-screen flex justify-center items-center"}>
            <div className="bg-[#FFF] dark:bg-neutral-950 w-[600px] h-[80vh] rounded-md flex flex-col justify-center items-center p-10">
                <img src="/logos/sem_fundo.png" alt="Power Watch" className={(darkMode?"dark":"") + ' dark:hidden h-30 w-50'}/>
                <img src="/logos/sem_fundo_dark.png" alt="Power Watch" className={(darkMode?"dark":"") + ' hidden dark:inline h-30 w-50'}/>
                <h1 className='font-sans font-thin text-2xl dark:text-white'>Bem Vindo ao Power Watch</h1>
                <form className='mt-10 flex flex-col justify-center'>
                    <fieldset className='mt-5 grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor="email" className="dark:text-white">E-mail</Label>
                        <Input type='email' placeholder='example@email.com' name='email' className="w-[500px] dark:text-white"/>
                    </fieldset>

                    <fieldset className='mt-5 grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor="password" className="dark:text-white">Senha</Label>
                        <PasswordInput 
                            id="password"
                            autoComplete="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[500px] dark:text-white"
                        />
                    </fieldset>

                    <Button className="mt-5 bg-primary">Login</Button>
                </form>
            </div>
        </div>
    )
}