import 'jest-preset-angular'

Object.defineProperty(window, 'CSS', { value: null })
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
      getPropertyValue: () => {},
    }
  },
})

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  },
})

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
})

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    }
  },
})
