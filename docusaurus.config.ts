import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Madara docs',
  favicon: 'img/favicon.ico',
  
  // Set the production url of your site here
  url: 'https://madara-docs.pages.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'Madara is an open source stack that allows you to build app chains powered by Cairo and Starknet technology',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: 'Madara is an open source stack that allows you to build app chains powered by Cairo and Starknet technology',
      },
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'walnuthq', // Usually your GitHub org/user name.
  // projectName: 'madara-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [require.resolve('docusaurus-lunr-search')],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
          
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    headTags: [
      {
        tagName: 'meta',
        attributes: {
          name: 'description',
          content: 'Madara is an open source stack that allows you to build app chains powered by Cairo and Starknet technology',
        },
      },
      {
        tagName: 'meta',
        attributes: {
          property: 'og:description',
          content: 'Madara is an open source stack that allows you to build app chains powered by Cairo and Starknet technology',
        },
      },
    ],
    // Replace with your project's social card
    metadata: [
      {
        property: 'og:image',
        content: '/img/metadata-preview.png'
      },
      {
        property: 'og:image:alt',
        content: 'Madara logo'
      },
      {
        property: 'og:image:width',
        content: '1200'
      },
      {
        property: 'og:image:height', 
        content: '309'
      },
    ],
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Madara logo',
        src: 'img/Madara logomark - Red - Duotone.png',
      },
      items: [
        {
          href: 'https://github.com/madara-alliance/madara',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
       { html: `MIT 2025 © Madara - Cairo-Powered Chains. With ❤️ by <a href='https://walnut.dev/' target='_blank'>Walnut</a>`}
      ],
      
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
