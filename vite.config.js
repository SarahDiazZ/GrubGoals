import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		port: 5173,
		proxy: { "/api": "http://localhost:4000",
			"/google": "http://localhost:4000",
			"/auth/google/callback": {
				target: "http://localhost:4000",
				changeOrigin: true,
				secure: false,
			},
			"/auth/google": {
				target: "http://localhost:4000",
				changeOrigin: true,
				secure: false,
			},
			"/protected": "http://localhost:4000",
			"/logout": "http://localhost:4000",
			"/auth/failure": "http://localhost:4000",
		}
	}
});
