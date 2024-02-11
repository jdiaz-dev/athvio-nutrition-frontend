import React from 'react';

function PatientBasicInfo({ firstname, lastname, image }: { firstname: string; lastname: string; image?: string }) {
  image;
  return (
    <>
      {firstname} {lastname}
    </>
  );
}

export default PatientBasicInfo;
