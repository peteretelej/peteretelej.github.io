// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://peteretelej.github.io',
  integrations: [mdx(), react(), sitemap()],
  experimental: {
    clientPrerender: true,
  },
  
  redirects: {
    '/setup-ubuntu-vps': '/readme/setup-ubuntu-vps',
    '/how-to-use-php-curl-basics': '/readme/how-to-use-php-curl-basics',
    '/git-commands-quick-dirty-git-shortcuts': '/readme/git-commands-quick-dirty-git-shortcuts',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});