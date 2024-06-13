
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPage.css'; // Import CSS file for styling

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');

  useEffect(() => {
    axios.get(`/api/images/${id}`)
      .then(res => setCaption(res.data.caption))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/images/${id}`, { caption })
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="edit-page">
      <h1>Edit Image</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
};

export default EditPage;
