import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Madara docs',
  tagline: 'Madara Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://walnuthq.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/madara-docs/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'walnuthq', // Usually your GitHub org/user name.
  projectName: 'madara-docs', // Usually your repo name.

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
          routeBasePath: '/'
        },
        blog: false,
        
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/Madara logomark - Red - Duotone.png',
    navbar: {
      title: 'Docs --- DRAFT CONTENTS - Please note the contents here are under heavy construction',
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
