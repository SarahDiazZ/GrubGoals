import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		port: 5173,
		proxy: {
			"/api": "http://app:5173",
			"/google": "http://app:4000",
			"/auth/google/callback": "http://app:4000",
			"/auth/google": "http://app:4000",
			"/protected": "http://app:4000",
			"/logout": "http://app:4000",
			"/auth/failure": "http://app:4000"
		}
	}
});
