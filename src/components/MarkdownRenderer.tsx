import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import RoughNotationWrapper from './RoughNotationWrapper'

interface MarkdownRendererProps {
  source: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ source }) => {
  // Process the markdown to handle rough notation syntax BEFORE markdown parsing
  const processRoughNotation = (text: string) => {
    const patterns = [
      { regex: /\[highlight\](.*?)\[\/highlight\]/g, type: 'highlight' as const, color: '#ffeb3b' },
      { regex: /\[underline\](.*?)\[\/underline\]/g, type: 'underline' as const, color: '#007aff' },
      { regex: /\[circle\](.*?)\[\/circle\]/g, type: 'circle' as const, color: '#f44336' },
      { regex: /\[box\](.*?)\[\/box\]/g, type: 'box' as const, color: '#4caf50' },
      { regex: /\[crossed-off\](.*?)\[\/crossed-off\]/g, type: 'crossed-off' as const, color: '#9e9e9e' },
      { regex: /\[bracket\](.*?)\[\/bracket\]/g, type: 'bracket' as const, color: '#ff9800' },
    ]

    let processedText = text

    patterns.forEach(({ regex, type, color }) => {
      processedText = processedText.replace(regex, (match, content) => {
        // Replace with a special HTML span that we can target later
        return `<span data-rough-notation="${type}" data-color="${color}">${content}</span>`
      })
    })

    return processedText
  }

  // Process the source text first
  const processedSource = processRoughNotation(source)

  // Custom component to handle rough notation spans after markdown rendering
  const enhanceWithRoughNotation = (element: React.ReactElement): React.ReactElement => {
    if (!element || typeof element !== 'object') return element

    // If this is a span with rough notation data
    if (element.type === 'span' && element.props?.['data-rough-notation']) {
      const type = element.props['data-rough-notation']
      const color = element.props['data-color']
      const content = element.props.children

      return (
        <RoughNotationWrapper type={type} color={color}>
          {content}
        </RoughNotationWrapper>
      )
    }

    // If this element has children, recursively process them
    if (element.props?.children) {
      const enhancedChildren = React.Children.map(element.props.children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })

      return React.cloneElement(element, {}, enhancedChildren)
    }

    return element
  }

  // Custom renderer that processes the entire tree
  const customComponents = {
    // Override the wrapper to process all content
    div: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <div {...props}>{enhancedChildren}</div>
    },
    p: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <p {...props}>{enhancedChildren}</p>
    },
    h1: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <h1 {...props}>{enhancedChildren}</h1>
    },
    h2: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <h2 {...props}>{enhancedChildren}</h2>
    },
    h3: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <h3 {...props}>{enhancedChildren}</h3>
    },
    h4: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <h4 {...props}>{enhancedChildren}</h4>
    },
    h5: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <h5 {...props}>{enhancedChildren}</h5>
    },
    h6: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <h6 {...props}>{enhancedChildren}</h6>
    },
    li: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <li {...props}>{enhancedChildren}</li>
    },
    ul: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <ul {...props}>{enhancedChildren}</ul>
    },
    ol: ({ children, ...props }: any) => {
      const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return enhanceWithRoughNotation(child)
        }
        return child
      })
      return <ol {...props}>{enhancedChildren}</ol>
    },
    span: ({ children, ...props }: any) => {
      // Handle rough notation spans
      if (props['data-rough-notation']) {
        const type = props['data-rough-notation']
        const color = props['data-color']
        return (
          <RoughNotationWrapper type={type} color={color}>
            {children}
          </RoughNotationWrapper>
        )
      }
      return <span {...props}>{children}</span>
    }
  }

  return (
    <div className="prose prose-lg max-w-none prose-black blog-content">
      <MDEditor.Markdown 
        source={processedSource}
        components={customComponents}
        rehypePlugins={[]}
        remarkPlugins={[]}
      />
    </div>
  )
}

export default MarkdownRenderer