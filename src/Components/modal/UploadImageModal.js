import { useState, useRef} from "react";
import useCatServices from "../../services/CatServices";
import PropTypes from "prop-types";

import { CloseButton } from "../buttons/Buttons";

import './uploadImageModal.scss';

const UploadImageModal = ({isOpen, closeModal}) => {
    const {uploadImage, error, clearError} = useCatServices();
    const [image, setImage] = useState(null);
    const [isFormSubmit, setFormSubmit] = useState(false);
    const [isResponseGoted, setResponceGot] = useState(false);

    const input = useRef(null);
    const label = useRef(null);

    const uploadImageHandler = (event) => {
        const userImage = event.target.files[0];
        label.current.style.backgroundColor = '';
        clearError();
        setFormSubmit(false);
        setResponceGot(false);
        setImage(userImage);
        
    };

    const onClose = () => {
        input.current.value = null;
        label.current.style.backgroundColor = '';
        setFormSubmit(false);
        setResponceGot(false);
        setImage(null);
        closeModal();
    };

    const onUploadImage = (event) => {
        event.preventDefault();
        setFormSubmit(true);
        uploadImage(image)
            .then(() => {
                label.current.style.backgroundColor = 'var(--green)';
                setFormSubmit(false);
                setResponceGot(true);
            })
            .catch(() => {
                label.current.style.backgroundColor = 'var(--red-alt)';
                setFormSubmit(false);
                setResponceGot(true);
            });
    };

    return isOpen ? (
        <div className="upload_image modal">
            <CloseButton
                close={onClose}/>
            <form className="upload_image_form"
                onSubmit={onUploadImage}>
                <div className="form_text">
                    <h1>Upload a .jpg, .png or .gif Cat Image</h1>
                    <span>Any uploads must comply with the <a href="https://thecatapi.com/privacy">upload guidelines</a> or face deletion.</span>
                </div>
                <label
                    ref={label}>
                    {image ? <img src={URL.createObjectURL(image)} alt='cat'/> : <NoFotoSvg/>}
                    <span className={`input_placeholder ${image ? 'hide' : ''}`}>
                          <strong>Drag here</strong> your file or <strong>Click here</strong> to upload
                    </span>
                    <input  type="file" 
                            accept=".jpeg, .jpg, .png, .gif"
                            ref={input}
                            onChange={uploadImageHandler}/>    
                </label>
                <span className="user_image_name">{image ? `Image File Name: ${image.name}` : 'No file selected'}</span>
                <button className={image && !isResponseGoted ? '' : 'hide'}  
                        type="submit"
                        disabled={isFormSubmit}>
                            <Loader
                                visible={isFormSubmit}/>
                            {isFormSubmit ? 'uploading' : 'upload photo'}
                </button>
                <div className={`upload_log ${isResponseGoted ? '' : 'hide'}`}>
                    <i className={`icon_${error ? 'fail' : 'ok'}`}></i>
                    <span>{error ? 'No Cat found - try a different one' : 'Thanks for the Upload - Cat found!'}</span>
                </div>
            </form>
        </div>
    ) : null;
};

UploadImageModal.propTypes = {
    isOpen: PropTypes.bool, 
    closeModal: PropTypes.func
};

const Loader = ({visible}) => {
    return (
        <div className={`loader_wrapper ${visible ? '' : 'hide'}`}>
            <div className="loader">
                <div className="loader">
                    <div className="loader">
                    </div>
                </div>
            </div>
        </div>
    );
};

Loader.propTypes = {
    visible: PropTypes.bool
};

const NoFotoSvg = () => {
    return (
        <svg version="1.1" width="1080" height="1080" viewBox="0 0 1080 1080">
            <defs>
            </defs>
            <g transform="matrix(1 0 0 1 540 540)" id="c8f7aacb-0c8e-4f57-b455-450241d868a3"  >
            <rect style={{'stroke': 'none', 'strokeWidth': '1', 'strokeDasharray': 'none', 'strokeLinecap': 'butt', 'strokeDashoffset': '0', 'strokeLinejoin': 'miter', 'strokeMiterlimit': '4', fill: 'var(--background-alt)', 'fillRule': 'nonzero', opacity: '1', visibility: 'hidden'}} vectorEffect="non-scaling-stroke"  x="-540" y="-540" rx="0" ry="0" width="1080" height="1080" />
            </g>
            <g transform="matrix(1 0 0 1 540 540)" id="ba25bad7-6811-47b2-bb90-9a0af96aba0c"  >
            </g>
            <g transform="matrix(1 0 0 1 540 540)"  >
            <g vectorEffect="non-scaling-stroke"   >
                    <g transform="matrix(2 0 0 2 80 -80)"  >
            <path style={{stroke: 'none', 'strokeWidth': '1', 'strokeDasharray': 'none', 'strokeLinecap': 'butt', 'strokeDashoffset': '0', 'strokeLinejoin': 'miter', 'strokeMiterlimit': '4', fill: 'var(--background-alt)', 'fillRule': 'nonzero', opacity: '1'}} vectorEffect="non-scaling-stroke"  transform=" translate(-140, -60)" d="M 140 40 C 128.954 40 120 48.9543 120 59.9999 C 120 71.0456 128.954 79.9999 140 79.9999 C 151.046 79.9999 160 71.0456 160 59.9999 C 160 48.9543 151.046 40 140 40 Z" strokeLinecap="round" />
            </g>
                    <g transform="matrix(2 0 0 2 0 0)"  >
            <path style={{stroke: 'none', 'strokeWidth': '1', 'strokeDasharray': 'none', 'strokeLinecap': 'butt', 'strokeDashoffset': '0', 'strokeLinejoin': 'miter', 'strokeMiterlimit': '4', fill: 'var(--background-alt)', 'fillRule': 'evenodd', opacity: '1'}} vectorEffect="non-scaling-stroke"  transform=" translate(-100, -100)" d="M 0 20 C 0 8.9543 8.9543 0 20 0 L 180 0 C 191.046 0 200 8.9543 200 20 L 200 180 C 200 181.38 199.86 182.729 199.594 184.031 C 199.199 185.958 198.528 187.784 197.623 189.465 C 194.247 195.737 187.621 200 180 200 L 20 200 C 8.95431 200 0 191.046 0 180 L 0 20 Z M 64.6564 41.8952 L 60 37.2387 L 13.3333 83.9054 L 13.3333 20 C 13.3333 16.3181 16.3181 13.3333 20 13.3333 L 180 13.3333 C 183.682 13.3333 186.667 16.3181 186.667 20 L 186.667 133.333 L 156.095 133.333 L 64.7145 41.9526 C 64.6953 41.9333 64.6759 41.9142 64.6564 41.8952 Z" strokeLinecap="round" />
            </g>
            </g>
            </g>
        </svg>
    );
};

export default UploadImageModal;