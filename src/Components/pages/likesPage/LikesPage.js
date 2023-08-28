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

import "./likesPage.scss";

const LikesPage = () => {
    const {getVotings, deleteVote,loading, error} = useCatServices();
    const [likeImages, setLikeImages] = useState([]);
    const {viewImages, prevDisabled, nextDisabled,
           setImages,
           onChooseLimit, onPaginationNext, onPaginationPrev} = useUnloadableImage([]);

    const onDeleteFromLike = (voteId) => {
        deleteVote(voteId)
        .then(getVotings)
        .then(res => {
            const likeImages = res.filter(image => image.value === 'like');
            setLikeImages(likeImages);
        });
    };

    useEffect(() => {
        getVotings({})
        .then(res => {
            const likeImages = res.filter(image => image.value === 'like');
            setLikeImages(likeImages);
        });
    }, []);

    useEffect(() => {
        setImages(likeImages);
    }, [likeImages]);

    const errorMessage = error ? <ErrorMessage/> : null;
    const loader = loading ? <Spinner/> : null;
    const content = !loading && !error && likeImages ? <GridImageSection 
                                                viewImages={viewImages} 
                                                onFigcaptionClick={onDeleteFromLike}/> : null;
    
    return(
        <AppWrapper withoutTabIndex="likes">
            <aside className="filters_section like_page">
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

export default LikesPage;