import type { Metadata } from "next";
import { Heebo } from "next/font/google";
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
    "ליווי 1-על-1 במניות, אופציות, פיוצ'רס וקריפטו. מותאם אישית לרמה שלך. 5+ שנות ניסיון, רישיון ניהול תיקי השקעות, B.Sc. הנדסת תוכנה.",
  keywords:
    "מסחר במניות, ליווי אישי, שוק ההון, אופציות, פיוצ'רס, קריפטו, ירין מנוח, מנטור מסחר",
  authors: [{ name: "ירין מנוח" }],
  openGraph: {
    title: "ירין מנוח | ליווי אישי במסחר בשוק ההון",
    description:
      "ליווי 1-על-1 במניות, אופציות, פיוצ'רס וקריפטו. מותאם אישית לרמה שלך.",
    siteName: "ירין מנוח",
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ירין מנוח | ליווי אישי במסחר בשוק ההון",
    description: "ליווי 1-על-1 במניות, אופציות, פיוצ'רס וקריפטו.",
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
  telephone: "+972543451727",
  email: "yarinmanoah1443@gmail.com",
  sameAs: [
    "https://instagram.com/yarinmanoah",
    "https://twitter.com/yarinmanoah",
  ],
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
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "רישיון ניהול תיקי השקעות",
    },
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
        {/* Google Analytics 4 — uncomment and add your ID */}
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
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
