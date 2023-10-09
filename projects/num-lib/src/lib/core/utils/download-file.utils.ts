/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
