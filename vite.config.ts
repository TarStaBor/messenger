import {defineConfig} from "vite";
import handlebars from "vite-plugin-handlebars";
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins: [handlebars(), checker({
        typescript: true,
    })],
    build: {
        outDir: 'dist'
    }
})
