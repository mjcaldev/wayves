interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

interface ElementNode {
  type: string;
  children: (TextNode | ElementNode)[];
  level?: number; // for headings
}

export function strapiRichTextToMarkdown(content: ElementNode[]): string {
  return content
    .map((node) => {
      switch (node.type) {
        case "paragraph":
          return renderChildren(node.children) + "\n";
        case "heading":
          const level = node.level ?? 2;
          return `${"#".repeat(level)} ${renderChildren(node.children)}\n`;
        case "list":
          return node.children
            .map((item: any) => `- ${renderChildren(item.children)}`)
            .join("\n");
        default:
          return renderChildren(node.children) + "\n";
      }
    })
    .join("\n\n");
}

function renderChildren(children: (TextNode | ElementNode)[]): string {
  return children
    .map((child) => {
      if ("text" in child) {
        let text = child.text;
        if (child.bold) text = `**${text}**`;
        if (child.italic) text = `*${text}*`;
        if (child.code) text = `\`${text}\``;
        return text;
      } else {
        // Nested element node — recursion
        return strapiRichTextToMarkdown([child]);
      }
    })
    .join("");
}
