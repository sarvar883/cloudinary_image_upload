import React, { FC, useState, } from 'react';
import { History, LocationState } from 'history';
import { useDispatch, } from 'react-redux';
import { imageUpload } from '../actions/order';


interface ImageUploadProps {
  history: History<LocationState>;
}


const ImageUpload: FC<ImageUploadProps> = (props) => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<String>('');

  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) {
      setError('Произошла ошибка при загрузке файла');
      return;
    }

    setImage(e.target.files[0]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    if (!image) {
      setError('Произошла ошибка при загрузке файла');
      return;
    }

    formData.append('image', image);
    dispatch(imageUpload(formData, props.history));
  };

  return (
    <div className="container">
      {error && error.length > 0 && (
        <div className="row mt-2">
          <div className="col-12">
            <h2 className="text-danger">{error}</h2>
          </div>
        </div>
      )}

      <div className="row mt-2">
        <div className="col-lg-7 col-md-9 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Please upload your image</h2>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload;