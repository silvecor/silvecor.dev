---
title: Reimagined Static Blog
date: 2025-10-06
description: Perspectives and insights on static blogs from a minimalist design engineer.
tags:
  - frontend
  - react
---

## Introduction

I've always felt that I need a blog as my landfill of opinions and insights. After I decided to build one, I found none of the existing templates or frameworks fit me well. Sadly, or more frankly, they are bloated, old-fashioned, not customizable, or just not to my taste in design.

So in such a situation, building an entire personal website from scratch sounds attractive, for you don't have to bear those disadvantages. Honestly, I've started building my website multiple times, but never ended up establishing it to the public, only for I had some better ideas (actually they weren't) on the work finished so far and urgently started over.

## Embrace Modern Frameworks

The DX of [Next.js](https://nextjs.org) is like a pool of slop; however, its wonderful performance and fabulous UX make it the first choice of such a website. And I like the approach of Atomic CSS, which gives me fine-grained control of my components without boring effort on how to organise styles, so I pick [UnoCSS](https://unocss.dev).

[Velite](https://velite.js.org) is a lightweight but brilliant content management solution - it gives exactly what I want. And of course I'm enjoying the large [remark](https://remark.js.org/) ecosystem, particularly [Expressive Code](https://expressive-code.com), which provides beautiful code blocks without too much config. It also ships with some features like line numbers, a copy button, highlighting, and more. All of these, however, only need a simple line of React code to enable them.

```tsx
const getMDXComponent = (code: string) => {
  // eslint-disable-next-line ts/no-implied-eval
  const fn = new Function(code);
  return fn({ ...reactRuntime }).default;
};

export const MDXContent = ({
  code,
  components,
}: MDXContentProps) => {
  const Component = getMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};
```

I've also been writing some practical utilities like `createRecipe`, which is similar to Chakra UI. It is that simple but awesome.

For more details you might be interested in, you can visit [the source code](https://github.com/VLTHellolin/hellolin.top) of this website.

## Why We Don't Need...

### A Search Button

It should be Bing or Google's responsibility, not mine. All I need to do is some simple SEO things.

### CMS

I tend to only share my unique opinions, inspiring math topics, and effective methods of coding on a public blog, not notes I take in classes. So it will be much easier to maintain if I use a simple file system-based approach to manage posts.

Though I really like Notion's editor and its philosophy in organising papers, it's hard to bring Notion to a small personal website of a minimalist.

### Comment System

Actually, I want one. However, considering the difficulty of integrating the system and the necessity to moderate spam comments, I'd rather simply share my posts on social media.

## Wrapping Up

So the purpose of writing this post is to share the most suitable technology stack for engineers like me to start their blog. There are a number of exciting features I haven't shown in this post, like Callouts or math formulas. Again, if you are interested, visit [the source code](https://github.com/VLTHellolin/hellolin.top). It's AGPL licensed!
