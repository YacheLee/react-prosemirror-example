import _ from "lodash";
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {createUseStyles} from 'react-jss';
import {GREY_COLOR} from "../../../../config";
import types, {HEADING_DEFAULT_TYPE} from '../types';

const FONT_SIZE = 20;

const useStyles = createUseStyles({
    dropdownContent: {
        paddingTop: "5px",
        paddingLeft: "5px",
        paddingRight: "5px",
        backgroundColor:"#f9f9f9",
        minWidth:"100px",
        minHeight:"200px",
        boxShadow:"0px 8px 16px 0px rgba(0,0,0,0.2)",
        zIndex:9999999
    },
    dropdownList: {
        color:"black",
        padding:"8px 10px",
        height:"95%",
        textDecoration:"none",
        display:"block",
        "&:hover,&.hover": {
            cursor: "pointer",
            backgroundColor: GREY_COLOR
        }
    }
});

function Head({fontSize, hover, onClick, label}) {
    const classes = useStyles();

    return <div
        className={`${cn(classes.dropdownList, {hover})}`}
        style={{fontSize}} onClick={onClick}>
        {label}
    </div>
}

const HeadingList = ({onClick, value}) => {
    const classes = useStyles();

    return <div className={classes.dropdownContent}>
        {_.keys(types).map((level, index)=>{
            const label = types[level];
            const hover = level === value;
            const fontSize = FONT_SIZE - (2 * index);

            return <Head
                key={index}
                label={label}
                fontSize={fontSize}
                hover={hover}
                onClick={()=> onClick(level) }
            />
        })}
    </div>
};

HeadingList.defaultProps = {
    onClick: ()=>{},
    value: HEADING_DEFAULT_TYPE
};

HeadingList.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.oneOf(_.keys(types).map(e=>parseInt(e))),
};

export default HeadingList;
