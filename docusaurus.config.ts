import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Madara docs',
  tagline: 'Madara Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://madara-docs.pages.dev/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

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
        { html: `
          <div class='footer-wrapper'>
            <div class='footer-content'>
              <div class='footer-love'>
                Built with <span class='heart'>❤️</span> by
                <a href='https://walnut.dev/' target='_blank' rel="noopener noreferrer">Walnut</a>
              </div>
              <div class='footer-socials'>
                <a href="https://github.com/madara-alliance/madara" 
                   target='_blank' 
                   rel="noopener noreferrer"
                   aria-label="GitHub"
                   class='social-link'>
                  <img class="social-icon" src="img/github-logo.svg" alt="GitHub"/>
                </a>
                <a href="https://t.me/MadaraStarknet" 
                   target='_blank' 
                   rel="noopener noreferrer"
                   aria-label="Telegram"
                   class='social-link'>
                  <img class="social-icon" src="img/telegram-logo.svg" alt="Telegram"/>
                </a>
                <a href="https://x.com/MadaraStarknet" 
                   target='_blank' 
                   rel="noopener noreferrer"
                   aria-label="Twitter"
                   class='social-link'>
                  <img class="social-icon" src="img/twitter-logo.svg" alt="Twitter"/>
                </a>
              </div>
            </div>
          </div>`
        }
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
