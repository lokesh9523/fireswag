
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import * as appConstants from './../../../constants/appConstants';

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Grid,
    Button,
    Dialog,
    DialogContent,
    Typography,
    withStyles,
    TextField
} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { addUserAddress, apiUrl, getUserAddress, addorder } from './../../../redux/actions/userapi';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(theme => ({
    root: { padding: theme.spacing(5), marginTop: theme.spacing(6) },
    image: {
        display: 'block',
        marginLeft: "auto",
        marginRight: "auto",
        width: "50 %"
    },
    textcolor: {
        color: '#95cd33'
    }
}));
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <div variant="h6">{children}</div>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

function Cart(props) {
    const { history, cart, setCart, addUserAddress, getUserAddress, addorder } = props;
    const [updatedCart, setuUpdatedCart] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const [showAddressDlg, setAddressDlg] = useState(false);
    const [formState, setFormState] = useState({});
    const [refetch, setRefetch] = useState(0)
    const classes = useStyles();
    const [selectedAddress, setSelectedAddress] = useState({});

    useEffect(() => {
        setuUpdatedCart(cart)
    }, [cart])

    useEffect(() => {
        async function fetchData() {
            let res = await getUserAddress(localStorage.getItem(appConstants.USER_FS_ID));
            if (res.success) {
                setAddressList(res.data || [])
            }
        }
        fetchData()
    }, [refetch])
    const deleteHandle = (id) => {
        // localStorage.getItem(appConstants.USER_FS_TOKEN);
        setuUpdatedCart({ updatedCart: cart.filter(item => item._id !== id) });
        setCart(cart.filter(item => item._id !== id));
    }

    const handleChange = e => {
        e.persist();
        setFormState(formState => ({
            ...formState,
            [e.target.name]: e.target.value
        }));
    };
    const handleAddCart = () => {

    }
    const handleClose = () => { setAddressDlg(false) };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res = await addUserAddress(localStorage.getItem(appConstants.USER_FS_ID), formState);
        if (res.success) {
            setAddressDlg(false);
            setRefetch(refetch + 1);
        }

    }

    const handleAddAddress = () => { setAddressDlg(true) };

    const handleCheckBox = (address) => {
        setSelectedAddress(address);
    }
    const handleBuy = () => {

    }

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center" spacing={4}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right" >Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {updatedCart.length > 0 ?
                                    updatedCart.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" >
                                                <img src={`${apiUrl}${row.image_url}`} alt="book" style={{ width: '10%' }}></img>
                                            </TableCell>
                                            <TableCell align="right"> {row.name}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right"><span onClick={() => deleteHandle(row._id)}>delete</span></TableCell>
                                        </TableRow>
                                    )) : 'No items'

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={4} style={{ marginTop: '40px' }}>
                    {addressList.length && addressList.map((address, index) => (<>
                        <Grid item key={index} sm={3} style={{ border: '1px solid grey' }}>
                            <Checkbox
                                checked={selectedAddress._id === address._id ? true : false}
                                onChange={(e) => handleCheckBox(address)}
                                name="address"
                                color="primary"
                            />
                            <Typography component={'h6'}>{address?.address},{address?.address2},{address?.city},{address?.state},{address?.country}</Typography>
                        </Grid>
                        <Grid item sm={1}></Grid></>
                    ))}
                </Grid>
                <Grid container direction="row" style={{ marginTop: '32px' }}>
                    <Grid item sm={6}></Grid>
                    <Grid item sm={3}> <Button variant="outlined" style={{ color: '#95cd33' }} onClick={handleAddAddress}>ADD ADDRESS</Button></Grid>
                    <Grid item sm={3}>{cart.length && <Button variant="outlined" style={{ color: '#95cd33' }} onClick={handleAddAddress}>BUY</Button>}</Grid>
                </Grid>
                <Dialog
                    open={showAddressDlg}
                    onClose={handleClose}
                    maxWidth={'lg'}
                >

                    <DialogTitle onClose={handleClose} >
                        <Typography component={'span'} >Add Delivery Address</Typography>

                    </DialogTitle>
                    <DialogContent>
                        <form
                            className={classes.root}
                            onSubmit={handleSubmit}
                        >
                            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={4}>
                                <Grid item sm={4}>
                                    <TextField
                                        type="text"
                                        label="Address"
                                        placeholder="Enter address"
                                        name="address"
                                        onChange={handleChange}
                                        value={formState.address || ''}
                                        required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        type="text"
                                        label="Address2"
                                        placeholder="Enter address2"
                                        name="address2"
                                        onChange={handleChange}
                                        value={formState.address2 || ''}
                                        required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        type="number"
                                        label="Office Phone"
                                        placeholder="Enter address"
                                        name="office_phone"
                                        onChange={handleChange}
                                        value={formState.office_phone || ''}
                                        // required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        type="number"
                                        label="Home Phone"
                                        placeholder="Enter address"
                                        name="home_phone"
                                        onChange={handleChange}
                                        value={formState.home_phone || ''}
                                        // required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        type="State"
                                        label="Enter State"
                                        placeholder="Enter State"
                                        name="state"
                                        onChange={handleChange}
                                        value={formState.state || ''}
                                        // required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        type="City"
                                        label="Enter City"
                                        placeholder="Enter City"
                                        name="city"
                                        onChange={handleChange}
                                        value={formState.city || ''}
                                        // required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        type="Country"
                                        label="Enter Country"
                                        placeholder="Enter Country"
                                        name="country"
                                        onChange={handleChange}
                                        value={formState.country || ''}
                                        // required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item sm={4}>
                                    <TextField
                                        type="Pincode"
                                        label="Enter Pincode"
                                        placeholder="Enter Pincode"
                                        name="pincode"
                                        onChange={handleChange}
                                        value={formState.pincode || ''}
                                        // required
                                        fullWidth
                                        InputProps={{ classes: { root: classes.inputLabel } }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container direction="row">
                                <Grid item sm={9}></Grid>
                                <Grid item sm={3}><Button type="submit">Save</Button></Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {/* </>}
            </Grid> */}
        </Fragment>
    );
}

Cart.propTypes = {
    history: PropTypes.object.isRequired
};

// export default withRouter((Cart));
export default connect(null, { getUserAddress, addUserAddress, addorder })(
    withRouter((Cart))
)
// export default withRouter(withStyles(styles)(BookDetails));