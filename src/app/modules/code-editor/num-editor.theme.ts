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
