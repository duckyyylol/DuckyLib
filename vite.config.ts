import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ["rss-expo-specialist-feelings.trycloudflare.com", "hugh-topics-trades-palace.trycloudflare.com"]
	}
});
