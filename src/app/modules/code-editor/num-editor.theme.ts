export const numEditorTheme: monaco.editor.IStandaloneThemeData = {
  colors: {},
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'num-referenceModel', foreground: '7f00dc' },
    { token: 'num-queryStructure', foreground: '7f00dc', fontStyle: 'bold' },
    { token: 'num-referenceModel', foreground: '0095d0' },
    { token: 'num-archetypePredicate', foreground: 'bf4800' },
    { token: 'num-nodePredicate', foreground: 'bf4800' },
    { token: 'num-parameter', foreground: 'ce3d04' },
    { token: 'num-operator', foreground: 'd40576' },
    { token: 'num-function', foreground: 'd40576' },
    { token: 'num-datetime', foreground: 'd40576' },
    { token: 'num-boolean', foreground: 'd40576' },
    { token: 'num-number', foreground: 'd40576' },
    { token: 'num-string', foreground: 'd40576' },
  ],
}
