import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkList from '../components/LinkList';
import FeedbackForm from '../components/FeedbackForm';
import { fetchLinks } from '../api.js';

const Viewer = () => {
  const { year, branch, semester } = useParams();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks({ year, branch, semester })
      .then((data) => {
        setLinks(data.links || []);
      })
      .catch(console.error);
  }, [year, branch, semester]);

  return (
    <div className="container">
      <h1>
        {branch} - {year} - {semester}
      </h1>
      <LinkList links={links} />
      <hr />
      <FeedbackForm />
    </div>
  );
};

export default Viewer;