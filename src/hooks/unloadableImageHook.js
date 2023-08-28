import { useState, useEffect, useRef } from "react";

const useUnloadableImage = (imageArr) => {
    const [images, setImages] = useState(imageArr);
    const [viewImages, setViewImages] = useState([]);
    const [breedsOptions, setBreedsOptions] = useState([{ value: '', label: 'All breeds', }]);

    //filters
    const limit = useRef(5);
    const sort = useRef(false);
    const reversSort = useRef(true);

    //pagination
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);
    const offset = useRef(0);

    const onSetViewImages = () => {
        const showImageLength = images.slice((offset.current), (offset.current + limit.current)).length;
        showImageLength < limit.current ? setNextDisabled(true) : setNextDisabled(false);
        offset.current === 0 ? setPrevDisabled(true) : setPrevDisabled(false);

        setViewImages(images.slice((offset.current), (offset.current + limit.current)));
    };

    const onCutImagesArray = () => {
        setNextDisabled(false);
        onSetViewImages();

        if(images[0]?.name){
            const options = images.map(breed => {
                return{
                    value: breed.id,
                    label: breed.name,
                };
            });
            setBreedsOptions([breedsOptions[0], ...options]);
        }
    };

    const onChooseBreed = (option) => {
        const choosenBreed = images.find(breed => breed.id === option);
        if(choosenBreed){
            setViewImages([choosenBreed]);
            setNextDisabled(true);
            setPrevDisabled(true);
        } else {
            onSetViewImages();
        }
    };

    const onChooseLimit = (option) => {
        limit.current = +option;
        onSetViewImages();
    };

    const onSort = () => {
        sort.current = true;
        reversSort.current = false;

        setImages(images => images = images.slice().reverse());
    };

    const onReversSort = () => {
        sort.current = false;
        reversSort.current = true;

        setImages(images => images = images.slice().reverse());
    };

    const onPaginationNext = () => {
        offset.current += limit.current;
        onSetViewImages();
    };

    const onPaginationPrev = () => {
        offset.current - limit.current < 0 ? offset.current = 0 : offset.current -= limit.current;
        onSetViewImages();
    };

    useEffect(() => {
        onCutImagesArray();
    }, [images]);

    return {viewImages, breedsOptions, sort, reversSort, prevDisabled, nextDisabled,
            setImages,
            onChooseBreed, onChooseLimit, onSort, onReversSort, onPaginationNext, onPaginationPrev, };
};

export default useUnloadableImage;