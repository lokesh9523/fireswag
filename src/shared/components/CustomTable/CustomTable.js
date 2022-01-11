import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
  CircularProgress,
  TableSortLabel,
  Popover,
  Grid,
  // Checkbox,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import brandStyles from './../../../theme/brand';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import CloseIcon from '@material-ui/icons/Close';
// import CheckButton from 'components/CheckButton'


function EnhancedTableHead(props) {
  const { checkBoxSelection, numSelected, metaData, order, orderBy, onRequestSort, onSelectAllClick, IconLegend, rowCount } = props;

  const brandClasses = brandStyles();
  const classes = useStyles();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(null);

  const handlePreviewClick = (event, index) => {
    setOpen(index)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(null);
  };

  return (
    <TableHead>
      <TableRow>
        {
          checkBoxSelection &&
          <TableCell padding="checkbox">
            {/* <CheckButton  
              checked={ numSelected > 0}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              label={''} 
              name="groupCheck"
              onChange={onSelectAllClick} 
            /> */}
          </TableCell>
        }
        {metaData.map((headCell, index) => (
          <TableCell
            key={index}
            sortDirection={orderBy === headCell.key ? order : false}
            align={headCell.align ? headCell.align : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            style={{ minWidth: headCell.minWidth }}
            className={brandClasses.tableHead}
          >
            {!headCell.sortable
              ?
              headCell.label
              :
              <TableSortLabel
                active={orderBy === headCell.key}
                direction={orderBy === headCell.key ? order : 'asc'}
                onClick={createSortHandler(headCell.key)}
                classes={{
                  icon: brandClasses.tableSortLabel,
                  active: brandClasses.tableSortLabel
                }}
              >
                {headCell.label}
              </TableSortLabel>
            }
          </TableCell>

        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  checkBoxSelection: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  metaData: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(12),
    position: 'relative'
  },
  container: {
    // maxHeight: 440,
  },
  tbodyBlur: {
    '-webkit-filter': 'blur(5px)',
    '-moz-filter': 'blur(5px)',
    '-o-filter': 'blur(5px)',
    '-ms-filter': 'blur(5px)',
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    zIndex: 9
  },
  cellDiv: {
    padding: '3px 8px'
  },
  pagination: {
    paddingBottom: theme.spacing(6)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '8px',
    cursor: 'pointer',
    color: '#FFFFFF',
    fontSize: '16px'
  },
  subHeading: {
    background: '#0F84A9',
    borderRadius: '8px 8px 0px 0px',
    padding: '5px',
    '& .MuiTypography-h6': {
      color: '#FFFFFF'
    }
  },
  popoverscroll: {
    overflow: 'hidden'
  }


}));

// eslint-disable-next-line react/no-multi-comp
const CustomTable = (props) => {
  const {
    metaData,
    loading,
    CustomTableData,
    data,
    count,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    className,
    dense,
    ExpandableRow,
    hover,
    CustomIconLegend,
    checkBoxSelection
  } = props;

  const classes = useStyles();
  const brandClasses = brandStyles();
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={clsx(classes.root, className)}>
      <Paper className={classes.pagination}>
        {loading &&
          <CircularProgress
            className={clsx(loading && classes.spinner)}
          />
        }
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              checkBoxSelection={checkBoxSelection}
              classes={classes}
              metaData={metaData}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              IconLegend={CustomIconLegend}
              rowCount={data.length}
            />
            <TableBody
              className={clsx(loading && classes.tbodyBlur)}
            >
              {!data.length
                ?
                <TableRow>
                  <TableCell colSpan={metaData.length} align="center">
                    {'No data to display...'}
                  </TableCell>
                </TableRow>
                :
                data.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  // const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <React.Fragment key={index}>
                      <TableRow
                        className={index % 2 !== 0 ? '' : brandClasses.tableRow2}
                        hover={hover === false ? false : true}
                      >
                        {
                          checkBoxSelection && <TableCell padding="checkbox">
                            {/* <CheckButton  
                              checked={isItemSelected}
                              // inputProps={{ 'aria-labelledby': labelId }}
                              onClick={(event) => handleClick(event, row._id)}
                            /> */}
                          </TableCell>
                        }
                        {metaData.map((column, index) => {
                          return (
                            <TableCell 
                              align={column.align}
                              className={clsx(classes.cellDiv, column.cellStyle)}
                              key={index}
                              style={{ whiteSpace: column.noWrap ? 'nowrap' : 'normal'}}
                            >
                              <CustomTableData
                                column={column}
                                row={row}
                              />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {ExpandableRow &&
                        <ExpandableRow
                          row={row}
                          open={row.open}
                        />
                      }
                    </React.Fragment>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100, 1000]}
          component="div"
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div >
  );
};

CustomTable.propTypes = {
  metaData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  CustomTableData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  setOrder: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  className: PropTypes.any,
  ExpandableRow: PropTypes.func,
  hover: PropTypes.bool,
  CustomIconLegend: PropTypes.func,
  checkBoxSelection: PropTypes.bool
};

export default CustomTable;