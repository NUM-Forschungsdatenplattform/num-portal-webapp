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

export const numEditorTheme: monaco.editor.IStandaloneThemeData = {
  colors: {},
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'num-referenceModel', foreground: '0095d0' },
    { token: 'num-queryStructure', foreground: '7f00dc', fontStyle: 'bold' },
    { token: 'num-archetypePredicate', foreground: '00B36D' },
    { token: 'num-nodePredicate', foreground: '00B36D' },
    { token: 'num-parameter', foreground: 'ff4200' },
    { token: 'num-operator', foreground: 'b22e00' },
    { token: 'num-function', foreground: '9b0055' },
    { token: 'num-datetime', foreground: 'ff2a9e' },
    { token: 'num-boolean', foreground: '5a74ff' },
    { token: 'num-number', foreground: '25a003' },
    { token: 'num-string', foreground: '6c6323' },
  ],
}
