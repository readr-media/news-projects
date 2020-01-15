export const image = url => {
  return {
    url,
    getResolution(resolution) {
      const invalidResolution =
        resolution !== 'desktop' &&
        resolution !== 'tablet' &&
        resolution !== 'mobile' &&
        resolution !== 'tiny'

      if (!this.url || invalidResolution) {
        return this.url
      }

      const urlPieces = this.url.split(/(.jpg|.jpeg|.png)$/)
      return urlPieces[0] + `-${resolution}` + urlPieces[1]
    }
  }
}