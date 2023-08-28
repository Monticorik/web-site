import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import './label.scss';

const Label = (props) => {
    const defaultLabel = useLocation().pathname.slice(10);
    const {label, color = "red",} = props;

    return(
        <div className="label"
             data-color={color}>
            <span>{label || defaultLabel}</span>
        </div>
    );
};

Label.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string
};

export default Label;