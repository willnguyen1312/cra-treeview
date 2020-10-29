module.exports = {
  purge: {
    mode: "layers",
    layers: ["base", "components", "utilities"],
    content: ["./src/**/*.ts", "./src/**/*.tsx", "./public/**/*.html"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
