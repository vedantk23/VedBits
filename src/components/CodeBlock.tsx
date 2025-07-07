import React, { useEffect } from 'react'
import Prism from 'prismjs'

// Import core Prism CSS
import 'prismjs/themes/prism-tomorrow.css'

// Import language support
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-docker'

interface CodeBlockProps {
  children: string
  className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language = className?.replace('language-', '') || 'text'

  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  return (
    <pre className={`language-${language} code-block`}>
      <code className={`language-${language}`}>
        {children}
      </code>
    </pre>
  )
}

export default CodeBlock