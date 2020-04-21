import React from 'react';
import PropTypes from 'prop-types';
import {createUseStyles} from 'react-jss';
import {BLACK_COLOR, BORDER_RADIUS, GREY_COLOR} from "../../../config";

const useStyles = createUseStyles({
    root: {
        display: "flex",
        borderRadius: BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ({isActive=false})=>{
            return isActive ? BLACK_COLOR : "white";
        },
        color: ({isActive})=>{
            return !isActive ? BLACK_COLOR : "white";
        },
        "&:hover": {
            cursor: "pointer",
            backgroundColor: ({isActive=false})=>{
                return isActive ? BLACK_COLOR : GREY_COLOR;
            },
            color: ({isActive})=>{
                return isActive ? "white" : BLACK_COLOR;
            }
        }
    }
});

function ToolbarButton({onClick, ...props}){
    const classes = useStyles(props);

    return <div className={classes.root}>
        <props.component onClick={onClick} />
    </div>
}

ToolbarButton.defaultProps = {
    isActive: false,
    onClick: ()=>{}
};

ToolbarButton.propTypes = {
    component: PropTypes.elementType.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
};

export default ToolbarButton;
