---
title: Reimagined Static Blog
date: 2025-10-06
description: Perspectives and insights on static blogs from a minimalist design engineer.
banner:
  light: banner.png
  dark: banner.png
tags:
  - frontend
  - react
---

## Introduction

### Lorem ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor elit non nulla sagittis pharetra. Cras ut velit commodo, fringilla felis ut, porttitor eros. Donec lorem urna, bibendum non sapien nec, dapibus auctor libero. Integer fermentum id lectus vitae semper.

### Morbi gravida

#### Part 1

Morbi gravida massa ac sem hendrerit tincidunt. Vivamus aliquet, est sit amet tempor pellentesque, metus nibh sagittis enim, sit amet interdum erat massa et dui. Praesent sodales augue sit amet fermentum ultrices. Donec in egestas est, at mollis tellus. Vivamus condimentum nec ligula id lacinia. In hac habitasse platea dictumst. Nulla elementum quam eget magna tempor, sed aliquet justo posuere. Sed non fermentum quam.

#### Part 2

Ut rhoncus justo ut lorem maximus pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Cras hendrerit turpis congue, vulputate ligula in, rutrum quam.

Integer molestie odio condimentum aliquam pulvinar. Duis suscipit nisi a quam malesuada, eleifend posuere mi efficitur. Maecenas eget venenatis velit. Suspendisse eget pellentesque velit. Donec volutpat mauris ac sapien porta rutrum. Aliquam sit amet lacus dapibus, malesuada eros sed, vehicula dolor. Fusce id lobortis nunc. Integer pellentesque vulputate lectus, quis accumsan augue. Nullam non varius nunc, efficitur vestibulum odio. Cras libero leo, facilisis sed nisi eget, bibendum mollis nisi. Vestibulum eget tellus velit. Nulla facilisi.

## Code

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

:::note[This is title]
Lorem ipsum dolor sit amet.
:::

Nulla facilisi. Morbi id aliquet libero. Suspendisse nunc ipsum, imperdiet quis viverra id, finibus vitae sem. Suspendisse lacinia convallis metus vitae pretium. Vestibulum id consequat ante. Nullam faucibus quam eget quam faucibus posuere. Aliquam dolor nisl, ullamcorper id sagittis in, convallis sit amet risus. Fusce bibendum lacinia magna, eget convallis erat placerat at.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium at enim posuere fermentum. Aliquam at fermentum velit. Nullam ut mi enim. Suspendisse sit amet mi vulputate, aliquet odio ac, malesuada leo. Donec eros mauris, pretium sed vehicula at, luctus ut dolor. Curabitur et suscipit erat. Duis quis finibus felis, in fringilla elit. In et lacus eu nisl consectetur pulvinar. Sed congue maximus velit, id bibendum mi ultricies fermentum. Nulla bibendum auctor lacus pretium euismod. Vestibulum quis diam ut lacus sollicitudin tempor. Etiam ornare gravida enim id pellentesque. Sed ultricies lobortis eros sit amet luctus.
