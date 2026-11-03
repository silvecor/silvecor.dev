import rehypeMathML from '@daiji256/rehype-mathml';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { rehypeCopyLinkedFiles, s } from 'velite';
import { rehypeHeading, type TocItem } from './plugins/rehype-heading.ts';
import { remarkCallout } from './plugins/remark-callout.ts';

interface Result {
  html: string;
  toc: TocItem[];
}

export function markdown() {
  return s.custom<string | undefined>().transform<Result>(async (value, { meta }) => {
    value = value ?? meta.content;

    const toc: TocItem[] = [];
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkDirective)
      .use(remarkCallout)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrettyCode, {
        theme: {
          dark: 'github-dark',
          light: 'github-light',
        },
        keepBackground: false,
      })
      .use(rehypeCopyLinkedFiles, meta.config.output)
      .use(rehypeHeading, toc)
      .use(rehypeMathML)
      .use(
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      )
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process({ value, path: meta.path });
    const html = file.toString();

    return { html, toc };
  });
}
