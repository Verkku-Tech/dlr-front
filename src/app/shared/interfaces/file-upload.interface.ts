

export interface FileUpload {
    fieldName: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: ArrayBuffer | null
    size: number
  }
  