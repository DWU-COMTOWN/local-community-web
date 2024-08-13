import React from 'react'
import '../../css/App.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className = "header-container">
            <div className='header-wrap'>
                <div className="header-left-wrap">
                    <Link to='/'>
                        <h1>TOWN-IN</h1>
                    </Link>
                    <ul>
                        <li className='header-nav-item'>
                            게시판
                        </li>
                    </ul>
                    <ul>
                        <li className='header-nav-item'>
                            리뷰
                        </li>
                    </ul>
                    <ul>
                        <li className='header-nav-item'>
                            쪽지
                        </li>
                    </ul>
                    <ul>
                        <li className='header-nav-item'>
                            HELP
                        </li>
                    </ul>
                </div>
            </div>                
        </div>
    );
}