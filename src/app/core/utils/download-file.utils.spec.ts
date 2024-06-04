import { downloadFile, downloadPdf } from './download-file.utils'

describe('Download file utils', () => {
  beforeEach(() => {
    jest.spyOn(document.body, 'appendChild')
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should create the link for csv export correctly', () => {
    const expectedLink = document.createElement('a')
    expectedLink.setAttribute('href', 'https://test-link.com')
    expectedLink.setAttribute('download', 'csv_export_test.zip')
    expectedLink.style.display = 'none'

    downloadFile('test', 'csv', 'data')
    expect(document.body.appendChild).toHaveBeenCalledWith(expectedLink)
  })

  it('should create the link for a json export correctly', () => {
    const expectedLink = document.createElement('a')
    expectedLink.setAttribute('href', 'data:text/json;charset=utf-8,test-data-string')
    expectedLink.setAttribute('download', 'json_export_test.json')
    expectedLink.style.display = 'none'
    downloadFile('test', 'json', 'test-data-string')
    expect(document.body.appendChild).toHaveBeenCalledWith(expectedLink)
  })

  it('should create the link for a txt export correctly', () => {
    const expectedLink = document.createElement('a')
    expectedLink.setAttribute('href', 'data:text/txt;charset=utf-8,test-txt-data-string')
    expectedLink.setAttribute('download', 'txt_export_test.txt')
    expectedLink.style.display = 'none'
    downloadFile('test', 'txt', 'test-txt-data-string')
    expect(document.body.appendChild).toHaveBeenCalledWith(expectedLink)
  })

  it('should create expected download link for pdf files', () => {
    const blob = new Blob(['I am a test file blob'], { type: 'application/pdf' })
    const expectedLink = document.createElement('a')
    expectedLink.setAttribute('href', 'https://test-link.com')
    expectedLink.setAttribute('download', 'test-file.pdf')
    expectedLink.style.display = 'none'
    downloadPdf('test-file.pdf', blob)
    expect(document.body.appendChild).toHaveBeenCalledWith(expectedLink)
  })
})
