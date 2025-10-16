import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
	server: {
		proxy: {
			'/video-proxy': {
				target: 'https://stsfc001.feratel.com',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/video-proxy/, ''),
				configure: (proxy, _options) => {
					proxy.on('proxyReq', (proxyReq, _req, _res) => {
						proxyReq.setHeader('Referer', 'https://webtv.feratel.com/');
					});
				},
			},
		},
	},
});
