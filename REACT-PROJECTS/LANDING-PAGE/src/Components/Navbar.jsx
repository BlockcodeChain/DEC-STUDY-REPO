import { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const [ismenu, setismenu] = useState(false);
    const [isactive, setisactive] = useState("#home");

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About Us" },
        { href: "#service", label: "Services" },
        { href: "#testimonials", label: "Testimonials" },
    ];

    return (
        <nav className='bg-white/90 left-0 top-0 fixed right-0 backdrop-blur-sm z-50 border-b border-gray-200 shadow-sm'>
            
            <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16'>
                
                {/* Logo */}
                <div className='flex items-center gap-1 cursor-pointer px-5'>
                    <div className='w-4 h-4 opacity-100 hover:opacity-75 rounded-full bg-red-500 transition-opacity'></div>
                    <div className='w-4 h-4 rounded-full bg-blue-500 opacity-75 hover:opacity-100 transition-opacity -ml-2'></div>
                </div>

                {/* Desktop Navbar */}
                <div className='md:flex hidden gap-10'>
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={() => setisactive(link.href)}
                            className={`text-sm font-medium relative 
                                after:absolute after:bottom-0 after:left-0 after:h-0.5 
                                after:top-5 after:w-0 hover:after:w-full after:bg-blue-600 
                                after:transition-all 
                                ${isactive === link.href
                                    ? "text-blue-600 after:w-full"
                                    : "text-gray-600 hover:text-gray-900"}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Desktop Get-in-Touch Button */}
                <a
                    href="#newsletter"
                    className='hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg 
                    hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg 
                    hover:shadow-blue-100'
                >
                    Get in touch
                </a>

                {/* Mobile Hamburger */}
                <button onClick={() => setismenu(!ismenu)} className='md:hidden p-2 ml-auto'>
                    {ismenu ? <RxCross1 className='size-6' /> : <GiHamburgerMenu className='size-6' />}
                </button>

            </div>

            {/* Mobile Menu */}
            {ismenu && (
                <div className='md:hidden bg-white border-t border-gray-100 py-4'>
                    <div className='container mx-auto px-4 space-y-3'>
                        
                        {/* Mobile links */}
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                onClick={() => {
                                    setisactive(link.href);
                                    setismenu(false);
                                }}
                                className={`block text-sm font-medium py-2 
                                    ${link.href === isactive
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-gray-900"}`}
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Mobile Get-in-Touch Button */}
                        <a
                            href="#newsletter"
                            onClick={() => setismenu(false)}
                            className='block w-full text-center bg-blue-600 text-white px-6 py-2.5 rounded-lg 
                            hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg 
                            hover:shadow-blue-100'
                        >
                            Get in touch
                        </a>

                    </div>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
