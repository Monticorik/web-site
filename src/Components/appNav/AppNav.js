import { NavLink } from 'react-router-dom';

import { CloseButton } from '../buttons/Buttons';

import voting from '../../resources/img/vote-table.svg';
import breed from '../../resources/img/pet-breeds.svg';
import galery from '../../resources/img/images-search.svg';

import './appNav.scss';

const AppNav = () => {

    const menuArguments = [{src: voting, text: 'voting', color: 'purple'},
                           {src: breed, text: 'breed', color: 'green'},
                           {src: galery, text: 'galery', color: 'orange'}];

    const closeMenu = () => {
        document.querySelector('.left_side').style.display = '';
        document.querySelector('.right_side').style.display = '';
    };

    const getMenuList = () => {
        const menuList = menuArguments.map((item, index) => {
                return(
                    <li className="menu_option" 
                        roll={item.text + '_option'}
                        key={index}>
                        <NavLink to={`/web-site/${item.text}`} id={item.text}
                            className="menu_button"
                            href='#'
                            onClick={closeMenu}>
                            <div className="menu_img"
                                style={{backgroundColor: `var(--${item.color})`}}>
                                <img arya-hidden="true" src={item.src} alt={item.text}/>
                            </div>
                            <div className="menu_text">
                                <span>{item.text}</span>
                            </div>
                        </NavLink>
                    </li>
                );
            });
        return (
            <ul className="menu">
                {menuList}
            </ul>
        );
    };

    return (
        <nav id="main_menu">
                <CloseButton
                    close={closeMenu}/> 
                <span className="start_text">Lets start using The Cat API</span>
                {getMenuList()}
        </nav>
    );
};


export default AppNav;