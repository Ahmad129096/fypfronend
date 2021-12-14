// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient } from '@azure/storage-blob';

const sasToken = 'sp=racwdli&st=2021-12-14T18:36:11Z&se=2022-02-24T02:36:11Z&sv=2020-08-04&sr=c&sig=UOitP%2Fe0DdFgiRxMHPCxFjgbiQhJAwXbcDBYIfNvgHc%3D'
const containerName = 'images'
const storageAccountName ='fyptest1' || 'storagename' || 'azeem-azure';

  
  // Feature flag - disable storage feature to app if not configured
  export const isStorageConfigured = () => {
    return !((!storageAccountName || !sasToken));
  };
  
  // return list of blobs in container to display
  const getBlobsInContainer = async (containerClient) => {
    const returnedBlobUrls = [];
  
    // get list of blobs in container
    // eslint-disable-next-line
    for await (const blob of containerClient.listBlobsFlat()) {
      // if image is public, just construct URL
      returnedBlobUrls.push(
        `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
      );
    }
  
    return returnedBlobUrls;
  };
  
  
  const createBlobInContainer = async (containerClient, file) => {
    
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);
  
    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
  
    // upload file
    await blobClient.uploadBrowserData(file, options);
    await blobClient.setMetadata({UserName : 'shubham'});
  };
  
  const uploadFileToBlob = async (file) => {
    if (!file) return [];
  
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
  
    // upload file
    await createBlobInContainer(containerClient, file);
  
    // get list of blobs in container
    return getBlobsInContainer(containerClient);
  };
  // </snippet_uploadFileToBlob>
  
  export default uploadFileToBlob;