import React from 'react';

function ClientBasicInfo({ firstName, lastName, image }: { firstName: string; lastName: string; image?: string }) {
  image;
  return (
    <>
      {firstName} {lastName}
    </>
  );
}

export default ClientBasicInfo;
