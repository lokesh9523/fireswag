import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuItemNav from '../MenuNav';
// import { Logout, MenuCollapse } from 'icons';
// import { showConfirmationDialog } from './../../';
import { showConfirmationDialog } from './../../../../../../../../redux/actions/dialogAlert';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.sideMenuBgColor,
    '& .MuiTypography-body1': {
      color: '#043B5D',
      fontSize: '12px',
    },
    '&:hover': {
      background: theme.palette.sideMenuItemActiveColor,
      '& .MuiTypography-body1': {
        color: theme.palette.sideMenuActiveColor,
      },
    },
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(4,59,93,0.2)',
  }
}));

const SidebarNav = props => {
  const { pages, setAuthPages,showConfirmationDialog, className, onCollapse, staticContext, ...rest } = props;

  const classes = useStyles();
  
  const onLogout = () => {
    console.log("iam hereeeee")
    showConfirmationDialog('Are you sure?', 'Do you want to log out.', 'LOGOUT');
  }

  const handleExpand = (module_name) => {
    setAuthPages(
      pages.map(page =>
        page.module_name === module_name ?
          { ...page, expanded: !page.expanded } :
          { ...page, expanded: false }
      )
    );
  }

  return (
    <List
      disablePadding={true}
      {...rest}
      className={className}
    >
      {pages.map((page, index) => (
        <MenuItemNav
          title={page.title}
          href={page.href}
          icon={page.icon}
          expanded={page.expanded}
          module_name={page.module_name}
          handleExpand={handleExpand}
          children={page.children}
          key={index}
        />
      ))}
      <ListItem
        button
        classes={{ root: classes.root }}
        onClick={onLogout}
      >
        {/* <ListItemIcon style={{minWidth:'40px'}}>
          <Logout style={{ width: 18 }} />
        </ListItemIcon> */}
        <ListItemText primary={'Logout'} />
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  showConfirmationDialog: PropTypes.func.isRequired,
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  setAuthPages: PropTypes.func.isRequired,
  onCollapse: PropTypes.func
};

export default connect(null, {showConfirmationDialog  })(SidebarNav);
