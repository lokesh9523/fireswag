import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Routing from "./Routes";

const styles = (theme) => ({
    main: {
        marginLeft: theme.spacing(9),
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down("xs")]: {
            marginLeft: 0,
        },
    },
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function Main(props) {
    const { classes } = props;
    // const [selectedTab, setSelectedTab] = useState(null);
    // const [CardChart, setCardChart] = useState(null);
    // const [hasFetchedCardChart, setHasFetchedCardChart] = useState(false);
    // const [EmojiTextArea, setEmojiTextArea] = useState(null);
    // const [hasFetchedEmojiTextArea, setHasFetchedEmojiTextArea] = useState(false);
    // const [ImageCropper, setImageCropper] = useState(null);
    // const [hasFetchedImageCropper, setHasFetchedImageCropper] = useState(false);
    // const [Dropzone, setDropzone] = useState(null);
    // const [hasFetchedDropzone, setHasFetchedDropzone] = useState(false);
    // const [DateTimePicker, setDateTimePicker] = useState(null);
    // const [hasFetchedDateTimePicker, setHasFetchedDateTimePicker] = useState(
    //     false
    // );
    // const [transactions, setTransactions] = useState([]);
    // const [statistics, setStatistics] = useState({ views: [], profit: [] });
    // const [posts, setPosts] = useState([]);
    // const [targets, setTargets] = useState([]);
    // const [messages, setMessages] = useState([]);
    // const [isAccountActivated, setIsAccountActivated] = useState(false);
    // const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);
    // const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState(null);
    return (
        <Fragment>
            <main className={classNames(classes.main)}>
                <Routing/>
            </main>
        </Fragment>
    );
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
