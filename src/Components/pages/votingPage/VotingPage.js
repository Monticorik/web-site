import { useState, useEffect } from "react";
import useCatServices from "../../../services/CatServices";

import AppWrapper from "../../appWrapper/AppWrapper";
import Label from "../../label/Label";
import { BackButton, UpdateButton } from "../../buttons/Buttons";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../error/ErrorMessage";

import "./votingPage.scss";

const VotingPage = () => {
    const {getSingleImage, getVotings, getFavouritings, setVote, setFavourite, loading, error} = useCatServices();
    const [image, setImage] = useState({});
    const [votes, setVotes] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [voteLog, setVoteLog] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const addToLike = () => {
        setBtnDisabled(true);
        setVote({vote: 1, imageId: image.id})
        .then(onLoadVotes);
    };

    const addToFavourite = () => {
        setBtnDisabled(true);
        setFavourite({imageId: image.id})
        .then(onLoadVotes);
    };

    const addToDislike = () => {
        setBtnDisabled(true);
        setVote({vote: 0, imageId: image.id})
        .then(onLoadVotes);
    };

    const onLoadVotes = () => {
        getVotings({})
        .then(res => setVotes(res));

        getFavouritings({})
        .then(res => setFavourites(res));
    };

    const update = () => {
        getSingleImage()
        .then(res => {
            setImage(...res);
        });
    };

    useEffect(() => {
        getSingleImage()
        .then(res => {
            setImage(...res);
        });

        onLoadVotes();
    }, []);

    useEffect(() => {
        setVoteLog(() => 
            votes.concat(favourites)
                 .slice()
                 .sort((a, b) => a.createdTime < b.createdTime ? 1 : -1)
                 .map(vote => {
                 return(
                    <div className="log_row"
                        key={vote.id}>
                        <span className="time">{vote.createdTime.match(/(\d+:\d+)/gi)[0]}</span>
                            <span className="log_text">Image ID: <strong>{vote.imageId}</strong> was added to {vote.value}s</span>
                        <i className={`icon_${vote.value}`}></i>
                    </div>
                 );
        }));

        setBtnDisabled(false);
    }, [votes, favourites]);

    const errorMessage = error ? <ErrorMessage/> : null;
    const loader = loading ? <Spinner/> : null;
    const content = !loading && !error && image ? <img src={image.src} alt="cat" /> : null;
    
    return(
        <AppWrapper>
            <aside className="filters_section voting_page">
                <BackButton/>
                <Label text="Voting"/>
                <UpdateButton
                    updateFunction={update}/>
            </aside>
            <section className="img_block">
                <div className="image">
                    {loader}
                    {errorMessage}
                    {content}
                </div>
                <div className="voting_button_block">
                    <button className="add_to_like"
                            onClick={addToLike}
                            disabled={btnDisabled}>
                        <i className="icon_like"></i>
                    </button>
                    <button className="add_to_favourite"
                            onClick={addToFavourite}
                            disabled={btnDisabled}>
                        <i className="icon_favourite"></i>
                    </button>
                    <button className="add_to_dislike"
                            onClick={addToDislike}
                            disabled={btnDisabled}>
                        <i className="icon_dislike"></i>
                    </button>
                </div>
            </section>
            <section className="log_block">
                {voteLog}
            </section>
        </AppWrapper>
    );
};

export default VotingPage;