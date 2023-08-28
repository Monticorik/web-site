import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './appWrapper.scss';


const AppWrapper = (props) => {
    const {withoutTabIndex} = props;
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        navigate(`/search/${event.target[0].value}`);
    };

    const onMenuClick = () => {
        document.querySelector('.left_side').style.display = 'block';
        document.querySelector('.right_side').style.display = 'none';
    };

    return (
        <div className='right_side'>
            <main>
                <section className='search_block'>
                    <button className="menu"
                            onClick={onMenuClick}>
                        <i className="icon_menu"></i>
                    </button>
                    <div className="search_input">
                        <form onSubmit={onSubmitHandler}>
                            <input type="text" placeholder="Search for breeds by name"/>
                            <button className="search_button"
                                        type="submit">
                                    <i className="icon_search"></i>
                            </button>
                        </form>
                    </div>
                    <NavLink to="/web-site/likes" 
                            className="likes"
                            tabIndex={withoutTabIndex === 'likes' ? -1 : null}>
                        <i className="icon_like"></i>
                    </NavLink>
                    <NavLink to="/web-site/favourites" 
                            className="favourites"
                            tabIndex={withoutTabIndex === 'favourites' ? -1 : null}>
                        <i className="icon_favourite"></i>
                    </NavLink>
                    <NavLink to="/web-site/dislikes" 
                            className="dislikes"
                            tabIndex={withoutTabIndex === 'dislikes' ? -1 : null}>
                        <i className="icon_dislike"></i>
                    </NavLink>
                </section>
                <section className='main_block'>
                    {props.children}
                </section>
            </main>
        </div>
    );
};

AppWrapper.propTypes = {
    withoutTabIndex: PropTypes.bool,
    children: PropTypes.node,
};

export default AppWrapper;