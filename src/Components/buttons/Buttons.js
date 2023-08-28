import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import "./buttons.scss";

const BackButton = () => {
    const navigate = useNavigate();

    const onGoBack = () => {
        navigate(-1);
    };

    return(
        <button className="back_button"
                onClick={onGoBack}>
            <i className="icon_arrow_left"></i>
        </button>
    );
};

const CloseButton = ({close}) => {
    return(
        <button className="close_button"
            onClick={close}>
            <i className="icon_close"></i>
        </button>
    );
};

CloseButton.propTypes = {
    close: PropTypes.func
};

const UpdateButton = (props) => {
    const {updateFunction} = props;
    return(
        <button className="update_button"
            onClick={updateFunction}>
            <i className="icon_update"></i>
        </button>
    );
};

UpdateButton.propTypes = {
    updateFunction: PropTypes.func
};

export {BackButton, CloseButton, UpdateButton};



