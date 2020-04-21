import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    root: {
        height: 28
    }
});

function AButton({color, onClick}) {
    const classes = useStyles();

    return <svg
        onClick={onClick}
        className={cn("MuiSvgIcon-root-77", classes.root)}
        focusable="false"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <g>
            <path fill={color} d="M0 20h24v4H0z"/>
            <path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
        </g>
    </svg>
}

AButton.defaultProps = {
    color: "blue",
    onClick: ()=>{}
};

AButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func
};

export default AButton;
