import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // "@svgr/plugin-svgo",
    // "@svgr/plugin-jsx",
    // svgr({
    //   svgrOptions: {
    //     typescript: true,
    //     icon: true,
    //     svgoConfig: {
    //       plugins: [
    //         {
    //           name: "removeViewBox",
    //           active: false,
    //         },
    //       ],
    //     },
    //   },
    // }),
    svgr({
      svgrOptions: {
        icon: true,
        // typescript: true,
        svgoConfig: {
          plugins: [
            {
              name: "removeViewBox",
              active: false,
            },
          ],
        },
      },
    }),
  ],
});
