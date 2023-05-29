import React from 'react';
import { useParams } from 'react-router-dom';

const ViewTables = () => {
  const { client_id } = useParams();

  return <div>ViewTables: {client_id}</div>;
};

export default ViewTables;
