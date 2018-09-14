const storage = require('@google-cloud/storage')

const { GCP_KEYFILE, GCP_FILE_BUCKET, GCP_PROJECT_ID, } = require('../../config')

const initBucket = () => {
  const gcs = storage({
    projectId: GCP_PROJECT_ID,
    keyFilename: GCP_KEYFILE,
  })
  return gcs.bucket(GCP_FILE_BUCKET)
}

const makeFilePublic = (bucketFile) => {
	return bucketFile.makePublic()
}

const uploadFileToBucket = (bucket, filePath, options) => {
  return new Promise((resolve, reject) => {
		const opts = options || {}
		const bucketFile = bucket.file(opts.destination)
		const metadata = {}
		
    if (opts.filetype) {
      metadata.contentType = opts.filetype
    }
       
    if (opts.cacheControl) {
        metadata.cacheControl = opts.cacheControl
    }

		bucket.upload(filePath, options)
		.then(() => { resolve(bucketFile) })
		.catch(err => { reject(err) })
	})
} 

module.exports = {
  initBucket,
  makeFilePublic,
  uploadFileToBucket
}