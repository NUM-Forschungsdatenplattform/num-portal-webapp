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

export const downloadFile = (name: string | number, format: 'csv' | 'json', data: string): void => {
  const filename = format === 'csv' ? `csv_export_${name}.zip` : `json_export_${name}.json`
  const downloadLink = document.createElement('a')
  downloadLink.setAttribute(
    'href',
    format === 'csv'
      ? URL.createObjectURL(new Blob([data], { type: 'application/zip' }))
      : 'data:text/json;charset=utf-8,' + encodeURIComponent(data)
  )
  downloadLink.setAttribute('download', filename)
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  downloadLink.remove()
}
