import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import bytesToSize from './byteToSize';

const useStyles = makeStyles(theme => ({
  root: {},
  deleteLink: {
    display: 'none !important',
    color: theme.palette.secondary.main,
    marginLeft: '1rem'
  },
  dropZone: {
    border: `3px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  '& .dropzone::before': {
    backgroundColor: '#FFFFFF',
    content: '',
    height: 10,
    position: 'absolute',
    top: '-2px',
    width: '100%'
  },
  '& .dropzone::after': {
    backgroundColor: '#FFFFFF',
    content: '',
    height: 10,
    position: 'absolute',
    top: '-13px',
    width: '100%'
  },
  '.MuiDivider-root': {
    padding: 0
  },
  textField: {
    width: '50%'
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  },
  image: {
    width: 130,
    marginRight: 20
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const FilesDropzone = ({
  type,
  multiple,
  title,
  logoPath,
  uploadMsg,
  counter,
  disabled,
  uploadState,
  setVlog,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  
  const handleDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles].concat(acceptedFiles));
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
    setVlog([]);
    };

  uploadState(false);

  const upState=()=>{
    uploadState(true);
    
  }

  const fileTypes = {
    video: [
      'video/webm',
      'video/mkv',
      'video/flv',
      'video/flv',
      'video/vob',
      'video/ogv',
      'video/ogg',
      'video/drc',
      'video/gif',
      'video/gifv',
      'video/mng',
      'video/avi',
      'video/MTS',
      'video/M2TS',
      'video/TS',
      'video/mov',
      'video/qt',
      'video/wmv',
      'video/yuv',
      'video/rm',
      'video/rmvb',
      'video/viv',
      'video/asf',
      'video/amv',
      'video/mp4',
      'video/m4p',
      'video/m4v',
      'video/mpg',
      'video/mp2',
      'video/mpeg',
      'video/mpe',
      'video/mpv',
      'video/mpg',
      'video/mpeg',
      'video/m2v',
      'video/m4v',
      'video/svi',
      'video/3gp',
      'video/3g2',
      'video/mxf',
      'video/roq',
      'video/nsv',
      'video/flv',
      'video/f4v',
      'video/f4p',
      'video/f4a',
      'video/f4b'
    ],
    image: ['image/jpeg', 'image/png']
  };



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: counter == false ? false:true,
    onDrop: handleDrop,
    multiple: multiple,
    accept: fileTypes[type],
   
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img alt="Select file" className={classes.image} src={logoPath} />
        </div>
        <div>
          <Typography variant="h3">{title}</Typography>
          <Box mt={2}>
            <div
              dangerouslySetInnerHTML={{
                __html: uploadMsg
              }}
            ></div>
          </Box>
        </div>
      </div>
      {files.length > 0 && files.length < 10 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />

                  <Link style={{display:'none'}}
                    className={classes.deleteLink}
                    variant="body1"
                    color="inherit"
                    to="#"
                    component={RouterLink}
                  >
                    DELETE
                  </Link>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button  style={{display:'none'}} onClick={upState}  color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  logoPath: PropTypes.string,
  uploadMsg: PropTypes.string
};

export default FilesDropzone;
