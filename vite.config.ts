import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@store': path.resolve(__dirname, './src/store'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@routes': path.resolve(__dirname, './src/routes'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@services': path.resolve(__dirname, './src/services'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
		},
	},
	plugins: [react(), svgr()],
});
