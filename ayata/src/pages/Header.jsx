import React from 'react'

export default function Header() {
  return (
    <div className="is-loading">
        <div className="global-container">
            <div className="header">
                <a href="https://ayata.com.np" className="logo">
                    <div className="logo-icon"></div>
                    <div id="menu-desktop" className="logo-letter">
                        <div className="logo-type"></div>
                    </div>
                </a>
                <div id="menu-desktop">
                    <div className="request">
                        <a className="mr-30 " href="https://ayata.com.np" data-mode="2">Home</a>
                        <a className="mr-30 " href="https://ayata.com.np" data-mode="2">About</a>
                        <a className="mr-30 " href="https://rooster.jobs/18183" data-mode="2">Careers</a>
                        <a className="mr-30 " href="https://ayata.com.np" data-mode="2">Services</a>
                        <a className="" href="https://ayata.com.np" data-mode="2">Works</a>
                    </div>
                </div>
                <div className="hamburger-menu">
                    <div className="hamburger"></div>
                </div>
            </div>
            <ul className="sidebar">
                <li><a href="#intro" className="sidebar-item"><span className="sidebar-line"></span></a></li>
                <li><a href="#problem" className="sidebar-item"><span className="sidebar-line"></span></a></li>
                <li><a href="#solution" className="sidebar-item"><span className="sidebar-line"></span></a></li>
                <li><a href="#usecases" className="sidebar-item"><span className="sidebar-line"></span></a></li>
                <li><a href="#partner" className="sidebar-item"><span className="sidebar-line"></span></a></li>
            </ul>
            <div className="meter">अयता इन्क</div>
            <div className="copyright js-fadeIn">
                — &copy; <span className="date">2021</span> by Ayata. All rights reserved. 
                <a className="fw-500 text-black" href="https://ayata.com.np" rel="noopener" target="_blank">| Privacy Policy</a>
            </div>
</div>
    </div>
  )
}
