import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
        <div id="overlays" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
