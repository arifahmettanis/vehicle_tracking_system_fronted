import React from 'react';

function SinglePhotoUploader({ label, photo, setPhoto }) {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleRemovePhoto = () => setPhoto(null);

  return (
    <div className="mb-4 text-center">
      <h6 className="fw-semibold mb-3">{label}</h6>

      <div
        className="border rounded-3 bg-light d-flex flex-column align-items-center justify-content-center shadow-sm"
        style={{
          width: '180px',
          height: '180px',
          overflow: 'hidden',
          transition: '0.2s all ease',
        }}
      >
        {/* Fotoğraf varsa */}
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt={label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <>
            <label
              htmlFor={`photo-${label}`}
              className="text-secondary d-flex flex-column align-items-center justify-content-center h-100 w-100"
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-camera-fill fs-1 mb-2"></i>
              <span className="fw-medium">Fotoğraf Çek</span>
            </label>
            <input
              type="file"
              id={`photo-${label}`}
              className="d-none"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              onClick={(e) => (e.target.value = null)}
            />
          </>
        )}
      </div>

      {/* Fotoğraf yüklendiyse altına “Sil” butonu göster */}
      {photo && (
        <button
          type="button"
          className="btn btn-outline-danger btn-sm mt-2 px-3"
          onClick={handleRemovePhoto}
        >
          <i className="bi bi-trash3 me-1"></i>
          Fotoğrafı Sil
        </button>
      )}
    </div>
  );
}

export default SinglePhotoUploader;
