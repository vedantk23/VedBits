import React from 'react'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  height = 400
}) => {
  return (
    <div className="markdown-editor-container">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none font-mono text-sm leading-relaxed"
        style={{ 
          height: `${height}px`,
          backgroundColor: 'white',
          color: 'black',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
        }}
      />
      
      <div className="mt-2 text-xs text-gray-500">
        <p>Supports Markdown formatting:</p>
        <div className="flex flex-wrap gap-4 mt-1">
          <span><strong>**bold**</strong></span>
          <span><em>*italic*</em></span>
          <span><code>`code`</code></span>
          <span># Heading</span>
          <span>- List item</span>
          <span>[Link](url)</span>
          <span>![Image](url)</span>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor