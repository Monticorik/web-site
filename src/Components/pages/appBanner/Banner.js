import banner from '../../../resources/img/girl-and-pet 1.svg';
import './banner.scss';

const Banner = () => {
    return (
        <div className='right_side first_page'>
            <main>
                <div className="banner">
                    <img src={banner} alt="banner girl and pet"/>
                </div>
            </main>
        </div>
    );
};

export default Banner;