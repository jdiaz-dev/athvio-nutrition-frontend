import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Tree from './Tree';
import ResponsiveAppBar from 'src/modules/Lab/Lab2';

const useStyles = makeStyles()(() => {
  return {
    divSidebar: {
      backgroundColor: '#282d35',
      color: 'white',
    },
    treeView: {
      flexGrow: 1,
      maxWidth: 400,
    },
  };
});

export function Drawer() {
  const { classes } = useStyles();

  return (
    <>
      <div className="main-container">
       {/*  <div className={`sidebar ${classes.divSidebar}`}>
          <div>Apocalipsex</div>
          <Tree />
        </div> */}
        <div className="app-container">
          <ResponsiveAppBar />
          {/* <Header></Header> */}
          <div className="containerOutler" style={{ height: '91vh' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
