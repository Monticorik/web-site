import { useState, useEffect } from "react";
import useCatServices from "../../../services/CatServices";
import useUnloadableImage from "../../../hooks/unloadableImageHook";

import AppWrapper from "../../appWrapper/AppWrapper";
import { BackButton } from "../../buttons/Buttons";
import Label from "../../label/Label";
import { LimitFilter } from "../../filters/PageFilters";
import GridImageSection from "../../gridImageSection/GridImageSection";
import Pagination from "../../pagination/Pagination";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error/ErrorMessage";

import "./favouritesPage.scss";

const FavouritesPage = () => {
    const {getFavouritings, deleteFavourite, loading, error} = useCatServices();
    const [favouriteImages, setFavouriteImages] = useState([]);
    const {viewImages, prevDisabled, nextDisabled,
           setImages,
           onChooseLimit, onPaginationNext, onPaginationPrev} = useUnloadableImage([]);

    const onDeleteFromFavourite = (favouriteId) => {
        deleteFavourite(favouriteId)
        .then( getFavouritings )
        .then(res => {
            setFavouriteImages(res);
        });
    };

    useEffect(() => {
        getFavouritings({})
        .then(res => {
            setFavouriteImages(res);
        });
    }, []);

    useEffect(() => {
        setImages(favouriteImages);
    }, [favouriteImages]);

    const errorMessage = error ? <ErrorMessage/> : null;
    const loader = loading ? <Spinner/> : null;
    const content = !loading && !error && favouriteImages ? <GridImageSection 
                                                    viewImages={viewImages} 
                                                    onFigcaptionClick={onDeleteFromFavourite}/> : null;

    return(
        <AppWrapper withoutTabIndex="favourites">
            <aside className="filters_section favourite_page">
                <BackButton/>
                <Label/>
                <LimitFilter
                    onChooseLimit={onChooseLimit}/>
            </aside>
            {loader}
            {errorMessage}
            {content}
            <Pagination
                prevDisabled={prevDisabled}
                nextDisabled={nextDisabled}
                onPaginationNext={onPaginationNext}
                onPaginationPrev={onPaginationPrev}/>
        </AppWrapper>
    );
};

export default FavouritesPage;