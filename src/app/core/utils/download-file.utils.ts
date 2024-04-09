export const downloadFile = (
  name: string | number,
  format: 'csv' | 'json' | 'txt',
  data: string
): void => {
  const filename =
    format === 'csv' ? `csv_export_${name}.zip` : `${format}_export_${name}.${format}`
  const downloadLink = document.createElement('a')
  setContent(downloadLink, format, data)
  downloadLink.setAttribute('download', filename)
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  downloadLink.remove()
}

const setContent = (
  downloadLink: HTMLAnchorElement,
  format: 'csv' | 'json' | 'txt',
  data: string
): void => {
  switch (format) {
    case 'csv':
      downloadLink.setAttribute(
        'href',
        URL.createObjectURL(new Blob([data], { type: 'application/zip' }))
      )
      break
    case 'json':
      downloadLink.setAttribute(
        'href',
        `data:text/${format};charset=utf-8,${encodeURIComponent(data)}`
      )
      break
    case 'txt':
      downloadLink.setAttribute('href', `data:text/${format};charset=utf-8,${data}`)
      break
  }
}

export const downloadPdf = (filename: string, data: Blob): void => {
  const downloadLink = document.createElement('a')
  const objectUrl = URL.createObjectURL(data)
  downloadLink.setAttribute('href', objectUrl)
  downloadLink.setAttribute('download', filename)
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  downloadLink.remove()
  URL.revokeObjectURL(objectUrl)
}
