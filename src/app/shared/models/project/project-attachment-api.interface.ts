export interface IProjectAttachmentApi {
  /**
   * Unique ID of this attachment
   */
  id: number
  /**
   * File name of the attachment
   */
  name: string
  /**
   * Optional description for the attachment
   */
  description?: string
  /**
   * Date of upload in full ISO 6801 format string, i.e. YYYY-MM-DDTHH.mm.ss.SSSZ
   */
  uploadDate: string
  /**
   * Review counter of the document providing the document has been reviewed and thus should no
   * longer be editable.
   */
  reviewCounter: number
}
