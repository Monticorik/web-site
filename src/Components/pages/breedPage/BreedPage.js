import { useState, useEffect } from "react";
import useCatServices from "../../../services/CatServices";
import useUnloadableImage from "../../../hooks/unloadableImageHook";

import AppWrapper from "../../appWrapper/AppWrapper";
import Label from "../../label/Label";
import { BackButton } from "../../buttons/Buttons";
import {LimitFilter, BreedsFilter} from '../../filters/PageFilters';
import GridImageSection from "../../gridImageSection/GridImageSection";
import Pagination from "../../pagination/Pagination";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error/ErrorMessage";

import './breedPage.scss';


const BreedsPage = () => {
    const {getAllBreeds, loading, error} = useCatServices();
    const [allBreeds, setAllBreeds] = useState([]);
    const {viewImages, breedsOptions, sort, reversSort, prevDisabled, nextDisabled,
           setImages,
           onChooseBreed, onChooseLimit, onSort, onReversSort, onPaginationNext, onPaginationPrev} = useUnloadableImage([]);

    useEffect(() => {
        getAllBreeds()
        .then(res => {
            setAllBreeds([...res]);
        });
    }, []);

    useEffect(() => {
        setImages(allBreeds);
    }, [allBreeds]);

    const errorMessage = error ? <ErrorMessage/> : null;
    const loader = loading ? <Spinner/> : null;
    const content = !loading && !error && allBreeds ? <GridImageSection viewImages={viewImages}/> : null;

    return(
        <AppWrapper>
            <aside className="filters_section breed_page">
                <BackButton/>
                <Label/>
                <BreedsFilter 
                    breedsOptions={breedsOptions} 
                    onChooseBreed={onChooseBreed}/>
                <LimitFilter
                    onChooseLimit={onChooseLimit}/>
                <button className="sort"
                        disabled={sort.current}
                        onClick={onSort}>
                    <i className="icon_sort"></i>
                </button>
                <button className="sort_revers"
                        disabled={reversSort.current}
                        onClick={onReversSort}>
                    <i className="icon_sort_revers"></i>
                </button>
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

export default BreedsPage;