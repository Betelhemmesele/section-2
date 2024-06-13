
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS file for styling

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/images')
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/images/${id}`)
      .then(() => setImages(images.filter(image => image._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="home-page">
      <h1>Image Gallery</h1>
      <Link to="/upload" className="upload-link">Upload Image</Link>
      <div className="gallery">
        {images.map(image => (
          <div key={image._id} className="image-card">
            <img src={image.url} alt={image.caption} />
            <p>{image.caption}</p>
            <div className="button-container">
              <button className="delete-button" onClick={() => handleDelete(image._id)}>Delete</button>
              <Link to={`/edit/${image._id}`} className="edit-link">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
