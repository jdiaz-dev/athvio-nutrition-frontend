import React from 'react';

function PatientBasicInfo({ firstName, lastName, image }: { firstName: string; lastName: string; image?: string }) {
  image;
  return (
    <>
      {firstName} {lastName}
    </>
  );
}

export default PatientBasicInfo;
