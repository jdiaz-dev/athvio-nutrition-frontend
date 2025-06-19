import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from 'src/core/components/NavBar';

export function Drawer() {
  return (
    <>
      <NavBar />
      <div className="containerOutler" style={{ height: '91vh' }}>
        <Outlet />
      </div>
    </>
  );
}
