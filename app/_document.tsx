/* eslint-disable @next/next/no-document-import-in-page */
import { Html, Head, Main, NextScript } from "next/document";
import { themeToCSS } from "@/lib/theme-utils";

export default function Document() {
  const preloadScript = `
    (function(){
      try {
        var t = localStorage.getItem('themeDoc');
        if (!t) return;
        var theme = JSON.parse(t);
        var css = (${themeToCSS.toString()})(theme);
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
      } catch(e){}
    })();
  `;

  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
