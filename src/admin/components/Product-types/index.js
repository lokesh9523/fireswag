import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button,
    TextField,
    Dialog,
    DialogContent,
    Typography,
    IconButton,
    // CircularProgress,
    withStyles,
    FormControl,
    MenuItem,
    Select,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { addProductType, getProductType1 } from './../../../redux/actions/adminapi';
import CustomTable from './../../../shared/components/CustomTable';
import moment from "moment";

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
    dialogheader: {
        color: 'white',
        backgroundColor: '#3cb371',
    },
    buttonItem: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
}));
const ProductTypes = props => {
    const { addProductType, getProductType1 } = props;
    const classes = useStyles();
    // hooks
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [produttypeList, setProductTypeList] = useState([]);
    const [productTypeCount, setProductTypeCount] = useState(0)
    const [productTypeData, setProductTypeData] = useState({});
    const [refetch, setrefetch] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('');
    const metaData = [
        { key: 'id', label: '' },
        { key: 'name', label: 'Product Type', align: 'left', sortable: true },
        { key: 'active', label: 'Active', align: 'left', sortable: true },
        { key: 'last_updated', label: 'Last Updated', align: 'left', sortable: true },
        { key: 'action', label: 'Action', align: 'center' }
    ];

    // useEffect(() => {
    //     async function fetchData() {
    //         if (!productTypesData) await getProductType();
    //         setProductTypeList(productTypesData);
    //         setProductTypeCount(productTypesData.length)
    //     }
    //     fetchData();
    // }, [productTypesData, getProductType]);

    useEffect(() => {
        (async () => {
            let queryParams = `page=${page}&rowsPerPage=${rowsPerPage}&order=${order}&orderBy=${orderBy}`;
            let res = {};
            setLoading(true);
            res = await getProductType1(queryParams);
            setLoading(false);
            console.log('getUser1', res);
            if (res.success) {
                setProductTypeList(res.data);
                console.log(res.data)
                setProductTypeCount(res.data.length);
            }
        })();
        // eslint-disable-next-line
    }, [refetch, page, rowsPerPage, order, orderBy]);

    const handleClose = () => {
        setOpenDialog(false); 
        setProductTypeData({});
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

    const handleProduct = async event => {
        event.preventDefault();
        let res = await addProductType(productTypeData);
        if (res.success) {
            setrefetch(refetch => (refetch + 1));
            setOpenDialog(false);
            setProductTypeData({ name: "", active: "" })
        }
    }
    const handleEdit = (data) => {
        setProductTypeData(data);
        setOpenDialog(true)
    }

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
                <Grid item sm={4} className={classes.buttonItem}><Button onClick={(e) => handleOpenDialog()} className={classes.button}>AddProductsTypes</Button></Grid>
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
                maxWidth={'sm'}
            >
                <DialogTitle onClose={handleClose} className={classes.dialogheader}> <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item sm={12}>
                        <Typography variant="h6">ADD/EDIT Products</Typography></Grid>
                </Grid>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleProduct}>
                        <Grid container direction="row" justifyContent="center"
                            alignItems="center" spacing={3}>
                            <Grid item sm={4}>
                                <TextField
                                    variant="outlined"
                                    margin="none"
                                    // required
                                    label="Product Type"
                                    name="name"
                                    value={productTypeData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    // autoFocus
                                    // autoComplete="off"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={4}>
                                <FormControl
                                    // className={brandClasses.shrinkTextField}
                                    fullWidth
                                    variant="outlined"
                                    required
                                >
                                    {/* <InputLabel shrink className={brandClasses.selectShrinkLabel}>Population</InputLabel> */}
                                    <Select
                                        onChange={handleChange}
                                        label="Active"
                                        name="active"
                                        displayEmpty
                                        value={productTypeData.active || ''}
                                    >
                                        <MenuItem value=''>
                                            <Typography >Select Type</Typography>
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
    // productTypesData: state.data.productTypesData,
});

ProductTypes.propTypes = {
    // history: PropTypes.object,
    addProductType: PropTypes.func.isRequired,
    getProductType1: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addProductType, getProductType1 })(withRouter(ProductTypes));
