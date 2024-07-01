export const mode = "development";
export const devtool = "inline-source-map";
export const entry = ["./src/app.tsx" /*main*/];
export const output = {
  filename: "./bundle.js", // in /dist
};
export const resolve = {
  // Add `.ts` and `.tsx` as a resolvable extension.
  extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
};
export const module = {
  rules: [
    { test: /\.tsx?$/, loader: "ts-loader" },
    {
      test: /\.(png|jpe?g|gif)$/i,
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
      },
    },
    {
      test: /\.scss$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-modules-typescript-loader" },
        { loader: "css-loader", options: { modules: true } },
        { loader: "sass-loader" }, // to convert SASS to CSS
        // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
      ],
    },
  ],
};
