import React from 'react'
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-95X53J9QHS"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
{`window.dataLayer = window.dataLayer || [];

function gtag(){dataLayer.push(arguments);} 

gtag('js', new Date());


gtag('config', 'G-95X53J9QHS');`}
        </Script>

        <Script id="clarity" strategy="afterInteractive">
{`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "PASTE YOUR CLARITY ID HERE");`}
        </Script>
        <title>Rajswa Blog</title>
        <link rel='icon' type='image/png' href='/favicon.png'>
      </head>
      <body>{children}</body>
    </html>
  )
}
