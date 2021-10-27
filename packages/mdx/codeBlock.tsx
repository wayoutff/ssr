import React from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
// import dracula from 'prism-react-renderer/themes/vsLight'
import theme from './theme'
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live'
import {mdx} from '@mdx-js/react'

export default ({children, className, live, render}) => {
  const language = className.replace(/language-/, '')

  if (live) {
    return (
      <div style={{marginTop: '40px', backgroundColor: 'black'}}>
        <LiveProvider
          code={children.trim()}
          transformCode={code => '/** @jsx mdx */' + code}
          scope={{mdx}}
        >
          <LivePreview />
          <LiveEditor />
          <LiveError />
        </LiveProvider>
      </div>
    )
  }

  return (
    <div style={{ overflow: 'auto', borderRadius: '10px', border: '1px solid #eaeaea' }}>
      <Highlight {...defaultProps} code={children.trim()} theme={theme} language={language}>
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre className={className} style={{...style, padding: '20px'}}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}