module.exports = {
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  trailingComma: 'none',
  overrides: [
    {
      files: 'src/**/*.{ts,tsx}',
      options: {
        tabWidth: 2,
        printWidth: 120,
        bracketSpacing: true,
        semi: true
      }
    }
  ]
}
