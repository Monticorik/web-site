//All filters made with using "react-select".
//Documentation for this API - https://react-select.com/home;

import PropTypes from 'prop-types';
import Select from 'react-select';

import "./pageFilters.scss";

const LimitFilter = (props) => {
    const {onChooseLimit, label} = props;
    const limitOptions = [
        { value: '5', label: 'Limit: 5', },
        { value: '10', label: 'Limit: 10', },
        { value: '15', label: 'Limit: 15', },
        { value: '20', label: 'Limit: 20', },
    ];

    return (
        <div id="limit_filter">
            {label ? <label htmlFor="limit">Limit</label> : null}
            <Select id='limit'
                    className='limit'
                    classNamePrefix={'limit'}
                    placeholder="Limit"
                    unstyled
                    openMenuOnFocus
                    onChange={option => onChooseLimit(option.value)}
                    defaultValue={limitOptions[0]}
                    options={limitOptions}
            />     
        </div>
    );
};

LimitFilter.propTypes = {
    label: PropTypes.bool,
    onChooseLimit: PropTypes.func,
};

const BreedsFilter = (props) => {
    const {onChooseBreed, breedsOptions, label} = props;
    return (
        <div id='breeds_filter'>
            {label ? <label htmlFor="breeds">Breeds</label> : null}
            <Select id='breeds'
                    className='breeds'
                    classNamePrefix={'breeds'}
                    placeholder="Breeds"
                    unstyled
                    openMenuOnFocus
                    menuShouldScrollIntoView
                    onChange={(option) => onChooseBreed(option.value)}
                    defaultValue={breedsOptions[0]}
                    options={breedsOptions}
            />     
        </div>
    );
};

BreedsFilter.propTypes = {
    label: PropTypes.bool,
    onChooseBreed: PropTypes.func,
    breedsOptions: PropTypes.arrayOf(PropTypes.object),
};

const OrderFilter = (props) => {
    const {onChooseOrder, label} = props;
    const orderOptions = [
        { value: 'RANDOM', label: 'Random', },
        { value: 'DESC', label: 'Desc', },
        { value: 'ASC', label: 'Asc', },
    ];

    return (
        <div id='order_filter'>
            {label ? <label htmlFor="order">Order</label> : null}
            <Select id='order'
                    className='order'
                    classNamePrefix={'order'}
                    placeholder="Order"
                    unstyled
                    openMenuOnFocus
                    onChange={(option) => onChooseOrder(option.value)}
                    defaultValue={orderOptions[0]}
                    options={orderOptions}
            />     
        </div>
    );
};

OrderFilter.propTypes = {
    onChooseOrder: PropTypes.func,
    label: PropTypes.bool
};

const TypeFilter = (props) => {
    const {onChooseType, label} = props;
    const typeOptions = [
        { value: 'gif,jpg,png', label: 'All', },
        { value: 'jpg,png', label: 'Static', },
        { value: 'gif', label: 'Animated', },
    ];

    return (
        <div id="type_filter">
            {label ? <label htmlFor="type">Type</label> : null}
            <Select id='type'
                    className='type'
                    classNamePrefix={'type'}
                    placeholder="Type"
                    unstyled
                    openMenuOnFocus
                    onChange={(option) => onChooseType(option.value)}
                    defaultValue={typeOptions[0]}
                    options={typeOptions}
            />     
        </div>
    );
};

TypeFilter.propTypes = {
    onChooseType: PropTypes.func,
    label: PropTypes.bool
};


export {LimitFilter, BreedsFilter, OrderFilter, TypeFilter};