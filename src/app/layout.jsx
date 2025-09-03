// src/app/layout.jsx
import Script from "next/script";

export const metadata = {
  title: "Natural Edge Media — Offer",
  description: "Fast, conversion-focused med-spa funnels with proof.",
};

export default function RootLayout({ children }) {
  const GA = process.env.NEXT_PUBLIC_GA4_ID; // e.g. G-XXXXXXX
  return (
    <html lang="en">
      <body>
        {children}
        {GA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // We'll send page_view manually from /offer to attach variant metadata.
                gtag('config', '${GA}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
