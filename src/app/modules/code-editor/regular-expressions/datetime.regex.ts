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

export const datetimeExtendedRegExp = new RegExp(
  "'\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}\\+\\d{2}:\\d{2}'"
)
export const datetimePortalRegExp = new RegExp(
  "'\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\+\\d{4}'"
)
export const dateExtendedRegExp = new RegExp("'\\d{4}-\\d{2}-\\d{2}'")
export const dateBasicRegExp = new RegExp("'\\d{8}'")
export const timeExtendedRegExp = new RegExp("'\\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}'")
export const timePortalRegExp = new RegExp("'\\d{2}:\\d{2}:\\d{2}'")
