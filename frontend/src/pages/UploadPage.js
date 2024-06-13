
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css'; // Import CSS file for styling

const UploadPage = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    axios.post('/api/images/upload', formData)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="upload-page">
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input"
        />
        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;
