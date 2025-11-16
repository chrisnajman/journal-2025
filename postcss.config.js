module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nesting"),
    // If you have any background images create an 'img' folder and put them in there.
    require("postcss-url")({
      url: "copy",
      assetsPath: "img",
      useHash: true,
    }),
    require("cssnano")({ preset: "default" }),
  ],
}
