import * as React from "react"
import { FileOutlined, HomeOutlined, SettingOutlined, UserOutlined, WifiOutlined} from '@ant-design/icons';

export default function Menu() {

    return (
        <div className="bg-primary dark:bg-neutral-900 h-[100vh] w-[60px] fixed top-0 left-0">
            <img src='/logos/logo_dark.png' className="mt-[1rem]"/>
            <nav className="flex justify-center items-center h-[100vh]">
                <ul className="flex justify-center flex-col items-center gap-[1.5rem]">
                    <li className="text-white text-2xl hover:text-[#68A6E0] cursor-pointer"><HomeOutlined /></li>
                    <li className="text-white text-2xl hover:text-[#68A6E0] cursor-pointer"><FileOutlined /></li>
                    <li className="text-white text-2xl hover:text-[#68A6E0] cursor-pointer" onClick={() => location.href='/device'}><WifiOutlined /></li>
                    <li className="text-white text-2xl hover:text-[#68A6E0] cursor-pointer" onClick={() => location.href = '/user'}><UserOutlined /></li>
                    <li className="text-white text-2xl hover:text-[#68A6E0] cursor-pointer"><SettingOutlined /></li>
                </ul>
            </nav>
        </div>
    );
}