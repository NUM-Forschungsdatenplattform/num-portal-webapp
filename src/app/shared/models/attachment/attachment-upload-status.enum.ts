/**
 * Status of upload request processing
 */
export enum AttachmentUploadStatus {
  /**
   * Upload is done and final steps will take some time to be completed
   */
  COMPLETING = 'completing',
  /**
   * Upload is done and has been acknowledged as finished
   */
  DONE = 'done',
  /**
   * Upload has failed
   */
  ERROR = 'error',
  /**
   * Currently no upload taking place and ready for next upload
   */
  IDLE = 'idle',
  /**
   * Upload in progress and reports progress events in regular intervals
   */
  IN_PROGRESS = 'in-progress',
}
