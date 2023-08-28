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

import "./dislikesPage.scss";

const DislikesPage = () => {
    const {getVotings, deleteVote, loading, error} = useCatServices();
    const [dislikeImages, setDislikeImages] = useState([]);
    const {viewImages, prevDisabled, nextDisabled,
           setImages,
           onChooseLimit, onPaginationNext, onPaginationPrev} = useUnloadableImage([]);

    const onDeleteFromDislike = (voteId) => {
        deleteVote(voteId)
        .then(getVotings)
        .then(res => {
            const likeImages = res.filter(image => image.value === 'dislike');
            setDislikeImages(likeImages);
        });
    };

    useEffect(() => {
        getVotings({})
        .then(res => {
            const likeImages = res.filter(image => image.value === 'dislike');
            setDislikeImages(likeImages);
        });
    }, []);

    useEffect(() => {
        setImages(dislikeImages);
    }, [dislikeImages]);

    const errorMessage = error ? <ErrorMessage/> : null;
    const loader = loading ? <Spinner/> : null;
    const content = !loading && !error && dislikeImages ? <GridImageSection 
                                                    viewImages={viewImages} 
                                                    onFigcaptionClick={onDeleteFromDislike}/> : null;

    return(
        <AppWrapper withoutTabIndex="dislikes">
            <aside className="filters_section dislike_page">
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

export default DislikesPage;