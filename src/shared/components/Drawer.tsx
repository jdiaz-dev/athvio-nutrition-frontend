import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { Outlet } from 'react-router-dom';
import NavBar from 'src/core/components/NavBar';

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
  //todo: delete styles
  const { classes } = useStyles();

  return (
    <>
      <NavBar />
      <div className="containerOutler" style={{ height: '91vh' }}>
        <Outlet />
      </div>
    </>
  );
}
