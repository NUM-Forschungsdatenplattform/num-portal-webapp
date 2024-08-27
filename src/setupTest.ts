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
  }),
})

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
})

window.open = jest.fn()

window.ResizeObserver = ResizeObserver

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
})

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
})

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => null,
})

Object.defineProperty(URL, 'createObjectURL', {
  value: () => 'https://test-link.com',
})

Object.defineProperty(URL, 'revokeObjectURL', {
  value: () => undefined,
})
