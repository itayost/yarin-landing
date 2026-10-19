import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import { CONTACT } from "@/lib/constants";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "ירין מנוח | ליווי אישי במסחר בשוק ההון",
  description:
    "ליווי 1-על-1 במסחר והשקעות: חוזים עתידיים, מניות וקריפטו. 7+ שנות ניסיון, B.Sc. הנדסת תוכנה, בהתמחות לרישיון ניהול תיקי השקעות.",
  keywords:
    "מסחר במניות, ליווי אישי, שוק ההון, אופציות, פיוצ'רס, קריפטו, ירין מנוח, מנטור מסחר",
  authors: [{ name: "ירין מנוח" }],
  openGraph: {
    title: "ירין מנוח | ליווי אישי במסחר בשוק ההון",
    description:
      "ליווי 1 על 1 במניות, חוזים עתידיים וקריפטו. מותאם אישית לרמה שלך.",
    siteName: "ירין מנוח",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ירין מנוח | ליווי אישי במסחר בשוק ההון",
    description: "ליווי 1 על 1 במניות, חוזים עתידיים וקריפטו.",
    creator: "@yarinmanoah",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "ירין מנוח",
  alternateName: "Yarin Manoah",
  description: "מנטור אישי למסחר בשוק ההון — מניות, אופציות, פיוצ'רס וקריפטו",
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  email: CONTACT.email,
  sameAs: [CONTACT.instagram, CONTACT.twitter],
  knowsAbout: [
    "Stock Trading",
    "Options Trading",
    "Futures Trading",
    "Cryptocurrency Trading",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "B.Sc. Software Engineering",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 — uncomment and add your ID. Enabling this (or the
            Facebook Pixel below) requires updating the "עוגיות וכלי מדידה" section
            of /privacy in the same change. */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} /> */}

        {/* Facebook Pixel — uncomment and add your ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        `}} /> */}
      </head>
      <body className="font-sans antialiased">
        <MotionProvider>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        </MotionProvider>
        {/* UserWay accessibility widget; loads after the page is idle */}
        <Script
          id="userway-widget"
          src="https://cdn.userway.org/widget.js"
          data-account="7ek953Xjr7"
          data-language="he"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
