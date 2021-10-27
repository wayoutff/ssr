import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from './codeBlock'

const components = {
  pre: props => <div {...props} />,
  a: props => <a style={{color: '#3b82f6'}} {...props}></a>,
  code: CodeBlock
}

export default function mdxWrapper ({ children }) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}