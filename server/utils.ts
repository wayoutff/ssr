import chalk from 'chalk'

export function colorLog (text, textColor = 'white', background = 'bgBlack'): void {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk[background][textColor](`${text}`)
  )
}