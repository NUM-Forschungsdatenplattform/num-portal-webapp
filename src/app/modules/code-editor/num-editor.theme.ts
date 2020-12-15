export const numEditorTheme: monaco.editor.IStandaloneThemeData = {
  colors: {},
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'num-operator', foreground: 'd40576' },
    { token: 'num-keyword', foreground: '7f00dc', fontStyle: 'bold' },
    { token: 'num-referenceModel', foreground: '0095d0' },
    { token: 'num-path', foreground: 'bf4800' },
    { token: 'num-time', foreground: 'ce3d04' },
  ],
}
