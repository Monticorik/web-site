import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import "./gridImageSection.scss";

const GridImageSection = (props) => {
    const {viewImages, onFigcaptionClick} = props;
    const pageName = useLocation().pathname.slice(1);

    const setImagesBlock = () => {
        const images = [];

        //this cicle divide image array on chunk with 5 objects
        //each chunk is handled by function that return a component
        for(let i = 0; i < viewImages.length; i += 5) {
            const arr = viewImages.slice(i, i + 5);
            images.push(imageListHandler(arr, i));
        }

        return(
            <>
                {images}
            </>
        );
    };

    const imageListHandler = (imageList, index) => {
        const images = imageList.map(image => {
                                return(
                                    <div className="grid_img"
                                        key={image.id}>
                                        {pageName === 'breed' || /search/.test(pageName) ? <ViewBreedImage breed={image}/> :
                                         pageName === 'galery' ? <ViewGaleryImage image={image}/> :
                                         <ViewVotingImage image={image}/>}
                                    </div>
                                );
                        });

        return(
            <div className="images_block"
                 key={index}>
                {images}
            </div>
        );
    };

    const ViewBreedImage = ({breed}) => {
        const {id, name, src} = breed;
        return (
            <Link to={`/web-site/breed/${id}`}>
                <figure>
                    <img src={src} alt={name}/>
                    <figcaption className="bottom">{name}</figcaption>
                </figure>
            </Link>
        );
    };

    ViewBreedImage.propTypes = {
        breed: PropTypes.object
    };

    const ViewGaleryImage = ({image}) => {
        const {src, id} = image;
        return (
            <figure>
                <img src={src} alt='cat'/>
                <figcaption className="center"
                            onClick={() => onFigcaptionClick(id)}>
                    <i className="icon_favourite"></i>
                </figcaption>
            </figure>
        );
    };


    ViewGaleryImage.propTypes = {
        image: PropTypes.object
    };

    const ViewVotingImage = ({image}) => {
        const {src, id, value} = image;
        return (
            <figure>
                <img src={src} alt='cat'/>
                <figcaption className="center"
                            onClick={() => onFigcaptionClick(id)}>
                    <i className={`icon_${value}`}></i>
                </figcaption>
            </figure>
        );
    };

    ViewVotingImage.propTypes = {
        image: PropTypes.object
    };

    return(
        <section>
            {setImagesBlock()}
        </section>
    );
};

GridImageSection.propTypes = {
viewImages: PropTypes.arrayOf(PropTypes.object),
onFigcaptionClick: PropTypes.func
};

export default GridImageSection;