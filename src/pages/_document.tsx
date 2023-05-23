import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <title>AgorA - Solana's first cNFT Marketplace</title>
      <meta
            name="keywords"
            content="AgorA Marketplace Solana cNFT"
          />
          <meta
            name="description"
            content="AgorA - Solana's First cNFT Marketplace to bring forth a change and put back the Soul in SOL"
          />
          <meta name="author" content="AgoriA" />
          <link rel="shortcut icon" href="/img/favicon.ico" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
