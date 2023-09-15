import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    esbuild: {
        // jsxInject: `import React from 'react'`, // Ensure React is imported for JSX support
    },

    optimizeDeps: {
        include: ['@testing-library/react', '@testing-library/jest-dom'], // Include testing-library dependencies
    },
})
