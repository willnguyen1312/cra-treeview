module.exports = {
  purge: {
    enabled: true,
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
