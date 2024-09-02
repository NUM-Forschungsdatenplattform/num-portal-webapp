import 'jest-preset-angular/setup-jest'
import 'zone.js'
import 'zone.js/testing'
import ResizeObserver from 'resize-observer-polyfill'

Object.defineProperty(window, 'CSS', { value: null })
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
    getPropertyValue: () => {},
    configurable: true,
  }),
})

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    configurable: true,
  }),
})

window.open = jest.fn()

window.ResizeObserver = ResizeObserver

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
  configurable: true,
})

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
})

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => null,
  configurable: true,
})

Object.defineProperty(URL, 'createObjectURL', {
  value: () => 'https://test-link.com',
  configurable: true,
  writable: true,
})

Object.defineProperty(URL, 'revokeObjectURL', {
  value: () => undefined,
  configurable: true,
})
