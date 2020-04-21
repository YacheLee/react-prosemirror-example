import React from 'react';
import {createUseStyles} from 'react-jss';
import BoldButton from './BoldButton';
import ItalicButton from './ItalicButton';
import UnderlineButton from './UnderlineButton';
import DelButton from './DelButton';
import TextColorButton from './TextColorButton';
import HeadingButton from './HeadingButton';

const useStyles = createUseStyles({
    root: {
        width: '100%',
        flexWrap: "nowrap",
        overflowX: "auto",
        display: "flex",
        flex: '0 0 auto',
        flexShrink: 0,
        padding: 0,
    },
    division: {
        margin: 12,
        width: 'auto',
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        "&:hover": {
            cursor: "pointer"
        }
    }
});

function Toolbar() {
    const classes = useStyles();

    return (
        <div className={classes.root} onMouseDown={e=>e.preventDefault()}>
            <HeadingButton />
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <DelButton />
            <TextColorButton />
        </div>
    );
}

Toolbar.defaultProps = {
};

Toolbar.propTypes = {
};

export default Toolbar;
