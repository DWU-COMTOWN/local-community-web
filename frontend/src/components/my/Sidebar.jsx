import React from 'react';
import '../../css/MyPage.css';
import {SidebarData} from './SidebarData'

function Sidebar() {
    return (
       <div className='Sidebar'>
        <p className='h3-mypage'>마이페이지</p>
        <ul className='SidebarList'>
            {SidebarData.map((val, key) => {
                return (
                <li 
                key={key} 
                className='row'
                onClick={() => {
                    window.location.pathname = val.link;
                    }}>
                        {" "}
                    <div id='title'>{val.title}</div>
                    <hr/>
                </li>
                );
            })}
         </ul>
        </div>
    );
}


export default Sidebar;
