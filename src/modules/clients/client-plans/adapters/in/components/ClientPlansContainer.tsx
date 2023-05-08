import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

function ClientPlansContainer() {
  const { clientId } = useParams();

  return <div>ClientPlansContainer</div>;
}

export default ClientPlansContainer;
