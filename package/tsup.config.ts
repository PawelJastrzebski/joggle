import { defineConfig } from 'tsup'
const tsConfigPath = `${__dirname}/tsconfig.json`;

export default defineConfig((options) => {
  const watch = options.watch;
  return {
    splitting: false,
    sourcemap: true,
    clean: false,
    dts: true,
    treeshake: true,
    target: "esnext",
    tsconfig: tsConfigPath,
    format: ["cjs", "esm"],
    entry: ['joggle.ts'],
    minify: !watch,
  }
})