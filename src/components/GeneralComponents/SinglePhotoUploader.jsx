// components/SinglePhotoUploader.jsx
import React from 'react';

function SinglePhotoUploader({ label, photo, setPhoto }) {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleRemovePhoto = () => setPhoto(null);

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      {photo ? (
        <div className="position-relative d-inline-block">
          <img
            src={URL.createObjectURL(photo)}
            alt={label}
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0"
            style={{ width: '24px', height: '24px', transform: 'translate(40%, -40%)' }}
            onClick={handleRemovePhoto}
          >
            &times;
          </button>
        </div>
      ) : (
        <div>
          <label htmlFor={`photo-${label}`} className="btn btn-outline-secondary">
            <i className="bi bi-camera-fill me-2"></i> Fotoğraf Çek
          </label>
          <input
            type="file"
            id={`photo-${label}`}
            className="d-none"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            onClick={(event) => (event.target.value = null)}
          />
        </div>
      )}
    </div>
  );
}

export default SinglePhotoUploader;
