import React from 'react';

function PatientBasicInfo({ firstname, lastname, image }: { firstname: string; lastname: string; image?: string }) {
  image;
  return (
    <div style={{ cursor: 'pointer' }}>
      {firstname} {lastname}
    </div>
  );
}

export default PatientBasicInfo;
