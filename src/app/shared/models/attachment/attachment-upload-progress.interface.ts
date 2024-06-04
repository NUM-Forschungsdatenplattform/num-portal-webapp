import { AttachmentUploadStatus } from './attachment-upload-status.enum'

export interface AttachmentUploadProgress {
  /**
   * Percentage value of already uploaded bytes
   */
  percentage: number
  status: AttachmentUploadStatus
}
