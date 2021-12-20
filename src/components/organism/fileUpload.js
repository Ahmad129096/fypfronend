
import React, { useState } from 'react';
import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from './fileConfig';
import { useSnackbar } from 'notistack';

const storageConfigured = isStorageConfigured();

const FileUpload = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  // all blobs in container
  let {setUpBtn} = props;

  console.log('this iseteup',props)
  
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files);
   let a = Array.from(event.target.files)
   let brr = [];
   let arr = a
   .map(t=> brr.push(t.name))
   console.log(brr,'brrrrrr');
    props.setUp(brr);
  };

  console.log(fileSelected);
  console.log('props.leng',props?.up?.length)
  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);
    setUpBtn(true);
    
    if(fileSelected == null){
      enqueueSnackbar('Please Upload a file first', {
        variant: 'error',
        autoHideDuration: 2000
      });
      setUploading(false);
    }
    
    // *** UPLOAD TO AZURE STORAGE ***
    else{
      for(let i=0 ; i<props?.up?.length; ++i)
    {
      var blobsInContainer = await uploadFileToBlob(fileSelected[i]);
    }
    
    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setUploading(false);
    setUpBtn(false);
    setInputKey(Math.random().toString(36));
    if(props.savePicture)
    {
      props.savePicture();
    }
  }
  };

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} multiple/>
      <button type="submit" onClick={onFileUpload}>
        Upload!
      </button>
      
    </div>
  );

  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h2>Container items</h2>
      <ul>
        {blobList.map((item) => {
          return (
            <li key={item}>
              <div>
                {Path.basename(item)}
                <br />
                {/* <img src={item} alt={item} height="200" /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div>
      <br/>
    
      {storageConfigured && !uploading && DisplayForm()}
       {storageConfigured && uploading && <div>Uploading</div>}

    </div>
  );
};

export default FileUpload;