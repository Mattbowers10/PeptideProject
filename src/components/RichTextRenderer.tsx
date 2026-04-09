import React from 'react'

// Minimal Payload Lexical JSON → React serializer
// Handles: paragraphs, headings, lists, bold, italic, underline, code, linebreak

type LexicalTextNode = {
  type: 'text'
  text: string
  format?: number // bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
}

type LexicalLinebreakNode = {
  type: 'linebreak'
}

type LexicalElementNode = {
  type: string
  tag?: string
  listType?: 'bullet' | 'number'
  children?: LexicalNode[]
  format?: string | number
}

type LexicalNode = LexicalTextNode | LexicalLinebreakNode | LexicalElementNode

function serializeText(node: LexicalTextNode): React.ReactNode {
  let content: React.ReactNode = node.text
  const fmt = node.format ?? 0
  if (fmt & 8) content = <u>{content}</u>
  if (fmt & 4) content = <s>{content}</s>
  if (fmt & 16) content = <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[12px] text-lavender">{content}</code>
  if (fmt & 2) content = <em>{content}</em>
  if (fmt & 1) content = <strong className="font-semibold text-white">{content}</strong>
  return content
}

function serializeChildren(children: LexicalNode[]): React.ReactNode[] {
  return children.map((child, i) => (
    <React.Fragment key={i}>{serializeNode(child)}</React.Fragment>
  ))
}

function serializeNode(node: LexicalNode): React.ReactNode {
  if (node.type === 'linebreak') return <br />

  if (node.type === 'text') return serializeText(node as LexicalTextNode)

  const el = node as LexicalElementNode
  const children = el.children ? serializeChildren(el.children) : null

  switch (el.type) {
    case 'paragraph':
      return (
        <p className="text-[15px] leading-[1.7] tracking-tight text-white/75">
          {children}
        </p>
      )
    case 'heading': {
      const tag = el.tag ?? 'h3'
      if (tag === 'h1')
        return <h1 className="text-[22px] font-medium tracking-heading text-white">{children}</h1>
      if (tag === 'h2')
        return <h2 className="text-[19px] font-medium tracking-heading text-white">{children}</h2>
      return <h3 className="text-[16px] font-medium tracking-subheading text-white">{children}</h3>
    }
    case 'list': {
      if (el.listType === 'number')
        return (
          <ol className="ml-5 list-decimal space-y-1">
            {children}
          </ol>
        )
      return (
        <ul className="ml-5 list-disc space-y-1">
          {children}
        </ul>
      )
    }
    case 'listitem':
      return <li className="text-[14px] leading-[1.6] text-white/70">{children}</li>
    case 'quote':
      return (
        <blockquote className="border-l-2 border-lavender/40 pl-4 text-[14px] leading-[1.6] text-white/50 italic">
          {children}
        </blockquote>
      )
    case 'horizontalrule':
      return <hr className="border-white/10" />
    default:
      // Unknown node — render children if any
      return children ? <>{children}</> : null
  }
}

type LexicalData = {
  root: {
    children: LexicalNode[]
  }
}

export function RichTextRenderer({
  data,
  className = '',
}: {
  data: LexicalData | null | undefined
  className?: string
}) {
  if (!data?.root?.children?.length) return null

  return (
    <div className={`space-y-3 ${className}`}>
      {data.root.children.map((node, i) => (
        <React.Fragment key={i}>{serializeNode(node)}</React.Fragment>
      ))}
    </div>
  )
}
