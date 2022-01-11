import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Grid,
    Button,
    TextField,
    Dialog,
    DialogContent,
    Typography,
    IconButton,
    CircularProgress,
    withStyles,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
// import Alert from '@material-ui/lab/Alert';
import { addProducts, getProducts1, getProducts, uploadImage, apiUrl, getProductType, updateProducts } from './../../../redux/actions/adminapi';
import CustomTable from './../../../shared/components/CustomTable';
import moment from "moment";
import { handleImage } from './../helpers';

import brandStyles from './../../../theme/brand';
// import { login, reCaptchaSiteKey } from 'actions/api';
// import { clearErrors } from 'actions/error';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: 'black',
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

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.white,
        height: '100%',
        paddingLeft: '90px',
        paddingTop: theme.spacing(2)
    },
    form: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 50,
        paddingTop: 100,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        color: '#3f51b5'
    },
    button: {
        color: 'white',
        backgroundColor: '#3cb371',
        fontSize: '1rem',
        padding: '8px 12px',
        minWidth: '125px',
        borderRadius: 8,
        '&:hover': {
            backgroundColor: theme.palette.brandDark,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: theme.palette.brand
            }
        },
        '&.MuiButton-containedSizeLarge': {
            fontSize: '1.4rem',
            padding: '12px 16px',
            minWidth: '140px',
        },
        '&.MuiButton-containedSizeSmall': {
            fontSize: '0.85rem',
            padding: '6px 8px',
            minWidth: '94px',
        },
    },
    buttonItem: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    dialogheader: {
        color: 'white',
        backgroundColor: '#3cb371',
    }
}));
const Product = props => {
    const { addProducts, getProducts1, getProducts, productTypesData, uploadImage, getProductType, updateProducts } = props;
    const classes = useStyles();
    const brandClasses = brandStyles();
    // hooks
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [produttypeList, setProductTypeList] = useState([]);
    const [productTypeCount, setProductTypeCount] = useState(0)
    const [productTypeData, setProductTypeData] = useState({});
    const [refetch, setrefetch] = useState(0);
    const [imgState, setImgState] = useState({});

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('');
    const [displayError, setDisplayError] = useState(null);
    const [displaySuccess, setDisplaySuccess] = useState(null);
    const [imgCompressionLoading, setImgCompressionLoading] = useState(false);
    const metaData = [
        { key: 'id', label: '' },
        { key: 'product_type_id.name', label: 'Product Type', align: 'left', sortable: true },
        { key: 'name', label: 'Name', align: 'left', sortable: true },
        { key: 'price', label: 'Price', align: 'left', sortable: true },
        { key: 'total_count', label: 'Available Count', align: 'left', sortable: true },
        { key: 'active', label: 'Active', align: 'left', sortable: true },
        { key: 'last_updated', label: 'Last Updated', align: 'left', sortable: true },
        { key: 'action', label: 'Action', align: 'center' }
    ];

    useEffect(() => {
        async function fetchData() {
            if (!productTypesData) await getProductType();
            setProductTypeList(productTypesData);
            // setProductTypeCount(productTypesData.length)
        }
        fetchData();
    }, [productTypesData, getProductType]);

    useEffect(() => {
        (async () => {
            let queryParams = `page=${page}&rowsPerPage=${rowsPerPage}&order=${order}&orderBy=${orderBy}`;
            let res = {};
            setLoading(true);
            res = await getProducts1(queryParams);
            setLoading(false);
            if (res.success) {
                setProductTypeList(res.data);
                setProductTypeCount(res.data.length);
            }
        })();
        // eslint-disable-next-line
    }, [refetch, page, rowsPerPage, order, orderBy]);

    const handleClose = () => {
        setOpenDialog(false);
        setProductTypeData({});
        setImgState({});
    };

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }
    const handleChange = event => {
        event.persist();
        setProductTypeData(formState => ({
            ...formState, [event.target.name]: event.target.value
        }));
    };

    const handleEdit = (data) => {
        setProductTypeData(data);
        setOpenDialog(true)
    }

    const handleProduct = async event => {
        event.preventDefault();
        if (imgState.imagePath) {
            const locationLogoData = new FormData();
            locationLogoData.append('uploadImage', imgState.imagePath);
            const resLocationLogo = await uploadImage(locationLogoData);
            if (resLocationLogo.success) {
                productTypeData.image_url = '/images/' + resLocationLogo.data;
                updateProduct();
                // let res = await addProducts(productTypeData);
                // if (res.success) {
                //     setrefetch(refetch => (refetch + 1));
                //     setOpenDialog(false);
                //     setProductTypeData({ name: "", active: "" })
                // }

            }
            // console.log(res, "=============================")
        } else if (productTypeData.image_url) {
            updateProduct();
        } else {
            alert("Plz check all the required fields")
        }
    }
    const updateProduct = async () => {
        let res = {};
        if (productTypeData._id) {
            res = await updateProducts(productTypeData._id, productTypeData);
        } else {
            res = await addProducts(productTypeData);
        } if (res.success) {
            setrefetch(refetch => (refetch + 1));
            setOpenDialog(false);
            setProductTypeData({});
            setImgState({});
        }
    }

    const handlePhotoChange = event => {
        handleImage(event, setDisplayError, setImgState, setImgCompressionLoading);
    };

    const CustomTableData = (data) => {
        const column = data.column;
        const row = data.row;
        const value = row[column.key];
        if (column.key === 'id') {
            return (
                <div className={classes.cellDiv}>
                    {''}
                </div>
            );
        }
        if (column.key === 'last_updated') {
            return (
                <div className={classes.cellDiv}>
                    {value ? moment.utc(value).format('MM/DD/YYYY') : ''}
                </div>
            );
        }
        if (column.key === 'name') {
            return (
                <div className={classes.cellDiv}>
                    {value}
                </div>
            );
        }
        if (column.key === 'active') {
            return (
                <div className={classes.cellDiv}>
                    {row.active === true ? 'True' : 'False'}
                </div>
            );
        }
        if (column.key === 'product_type_id.name') {
            return (
                <div className={classes.cellDiv}>
                    {row.product_type_id?.name}
                </div>
            );
        }


        if (column.key === 'action') {
            return (
                <EditIcon onClick={() => handleEdit(row)} style={{ cursor: 'pointer' }} />
            )
        }

        return (
            <div className={classes.cellDiv}>{value}</div>
            // <div className={row.active ? classes.cellDiv : clsx(classes.cellDiv, classes.inActive)}>{value}</div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center" spacing={3} >
                <Grid item sm={8}>

                </Grid>
                <Grid item sm={4} className={classes.buttonItem}><Button onClick={(e) => handleOpenDialog()} className={classes.button}>AddProductTypes</Button></Grid>
            </Grid>

            <CustomTable
                metaData={metaData}
                loading={loading}
                CustomTableData={CustomTableData}
                data={produttypeList}
                count={productTypeCount}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                order={order}
                setOrder={setOrder}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
            // ExpandableRow={ExpandableRow}
            // CustomIconLegend={CustomIconLegend}
            // checkBoxSelection
            />
            <Dialog
                open={openDialog}
                onClose={handleClose}
                maxWidth={'md'}
            >
                <DialogTitle onClose={handleClose} className={classes.dialogheader}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item sm={12}>
                            <Typography variant="h6">ADD/EDIT Products</Typography></Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleProduct}>
                        <Grid container direction="row" justifyContent="center"
                            alignItems="center" spacing={3}>
                            {productTypesData ?
                                <Grid item sm={6}>
                                    <FormControl
                                        // className={classes.shrinkTextField}
                                        fullWidth
                                        variant="outlined"
                                        required
                                    >
                                        <InputLabel className={classes.selectShrinkLabel}>Population</InputLabel>
                                        <Select
                                            onChange={handleChange}
                                            label="ProductType"
                                            name="product_type_id"
                                            displayEmpty
                                            fullWidth
                                            variant="outlined"
                                            value={productTypeData.product_type_id?._id || productTypeData.product_type_id || ''}
                                        >
                                            <MenuItem value=''>
                                                <Typography >Select Product Type</Typography>
                                            </MenuItem>
                                            {productTypesData.map((type, index) => (
                                                <MenuItem key={index} value={type._id}>
                                                    {type.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid> : ''}
                            <Grid item sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    // required
                                    label="Product Name"
                                    name="name"
                                    value={productTypeData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    // autoFocus
                                    // autoComplete="off"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    // required
                                    label="Price"
                                    name="price"
                                    value={productTypeData.price}
                                    onChange={handleChange}
                                    fullWidth
                                    // autoFocus
                                    // autoComplete="off"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    // required
                                    label="Discount"
                                    name="discount"
                                    value={productTypeData.discount}
                                    onChange={handleChange}
                                    fullWidth
                                    // autoFocus
                                    // autoComplete="off"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    // required
                                    label="Available Stock"
                                    name="total_count"
                                    value={productTypeData.total_count}
                                    onChange={handleChange}
                                    fullWidth
                                    // autoFocus
                                    // autoComplete="off"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl
                                    // className={classes.shrinkTextField}
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel shrink className={classes.selectShrinkLabel}>PreBooking Available</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        label="Prebooking"
                                        name="pre_booking"
                                        displayEmpty
                                        value={productTypeData.pre_booking || ''}
                                    >
                                        <MenuItem value=''>
                                            <Typography >Select Pre-booking</Typography>
                                        </MenuItem>
                                        <MenuItem value='true' key={'1'}>
                                            <Typography >YES</Typography>
                                        </MenuItem>
                                        <MenuItem value='false' key={'2'}>
                                            <Typography >NO</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={6}>
                                <FormControl
                                    // className={classes.shrinkTextField}
                                    fullWidth
                                    variant="outlined"
                                    required
                                >
                                    <InputLabel shrink className={classes.selectShrinkLabel}>Status</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        label="Active"
                                        name="active"
                                        displayEmpty
                                        value={productTypeData.active || ''}
                                    >
                                        <MenuItem value=''>
                                            <Typography >Select Status</Typography>
                                        </MenuItem>
                                        <MenuItem value='true' key={'1'}>
                                            <Typography >True</Typography>
                                        </MenuItem>
                                        <MenuItem value='false' key={'2'}>
                                            <Typography >False</Typography>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    // required
                                    label="Description"
                                    name="description"
                                    value={productTypeData.description}
                                    onChange={handleChange}
                                    fullWidth
                                    // autoFocus
                                    // autoComplete="off"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <Grid container direction="row" spacing={3}>
                                    <Grid item sm={6}>
                                        <Box height="100%">
                                            <div className={brandClasses.uploadContanier} style={{ height: '100%' }}>
                                                <Typography className={brandClasses.uploadTitle}>Upload Site Logo</Typography>
                                                <Typography display="inline" className={brandClasses.uploadDesc} style={{ padding: '4px' }}>Select your file or drag and drop it here</Typography>
                                                <div className={brandClasses.uploadImageContainer}>
                                                    <input type="file" accept="image/*" className={brandClasses.uploadInput} id="icon-button-file" onChange={handlePhotoChange} />
                                                    <label htmlFor="icon-button-file" style={{ cursor: 'pointer' }}>
                                                        {/* <img src="/images/svg/upload_cloud.svg" alt="" /> */}
                                                        <Typography>UPLOADPHOTO</Typography>
                                                        {imgCompressionLoading ? <CircularProgress size={20} className={brandClasses.progressSpinner} /> : ''}
                                                    </label>
                                                </div>
                                            </div>
                                        </Box>
                                    </Grid>

                                    <Grid item sm={6}>
                                        <Box style={{ paddingLeft: '16px' }} border="dotted 1px #D8D8D8" width="210px" height="110px" display="flex" alignItems="center" justifycontent="center">
                                            {imgState.imgURL
                                                ? <img src={imgState.imgURL} className={brandClasses.uploadedPhoto} alt="img" width="100%" />
                                                : productTypeData.image_url
                                                    ? <img src={apiUrl + productTypeData.image_url} className={brandClasses.uploadedPhoto} alt="img" width="100%" />
                                                    : <Typography className={classes.uploadDesc}>PHOTO<br /> PREVIEW</Typography>
                                            }
                                        </Box>
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid container direction="row" justifyContent="center"
                            alignItems="center" spacing={3}>
                            <Grid item sm={8}></Grid>
                            <Grid item sm={4} className={classes.buttonItem}>
                                <Button type="submit" className={classes.button} >ADD</Button>
                            </Grid>
                        </Grid>
                    </form></DialogContent>
            </Dialog>
        </div >
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    productTypesData: state.data.productTypesData,
});

Product.propTypes = {
    // history: PropTypes.object,
    addProducts: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    getProductType: PropTypes.func.isRequired,
    getProducts1: PropTypes.func.isRequired,
    updateProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addProducts, getProducts, uploadImage, getProductType, getProducts1, updateProducts })(withRouter(Product));

