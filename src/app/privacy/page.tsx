import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { IMAGES } from "@/lib/content";

/* DRAFT: written from what the site actually does (form fields, email via
 * Resend, Vercel hosting, optional webhook, no cookies or third-party
 * analytics). Must be approved by the owner and legal counsel before launch.
 * When approved, set PRIVACY_IS_DRAFT to false. */
const PRIVACY_IS_DRAFT = true;

export const metadata: Metadata = {
  title: "מדיניות פרטיות | ירין מנוח",
  robots: PRIVACY_IS_DRAFT
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

const SECTIONS = [
  {
    title: "כללי",
    body: [
      "אתר זה מופעל על ידי ירין מנוח. מדיניות זו מסבירה איזה מידע נאסף באתר, למה, ומה ניתן לעשות לגביו.",
    ],
  },
  {
    title: "איזה מידע נאסף",
    body: [
      "בטופס יצירת הקשר: שם, מספר טלפון, והתשובה שבחרתם לשאלה \"מה הדבר העיקרי שהיית רוצה לקבל ממני במהלך הליווי?\". הטופס אינו אוסף מידע נוסף.",
      "בנוסף, ספק האחסון של האתר רושם מידע טכני בסיסי, כגון כתובת IP, כחלק מהפעלת האתר. כתובת ה-IP משמשת גם להגבלת מספר הפניות כדי למנוע שימוש לרעה בטופס.",
    ],
  },
  {
    title: "למה המידע משמש",
    body: [
      "כדי לחזור אליכם ולתאם שיחת אפיון קצרה, ולענות על הפנייה שלכם. המידע לא ישמש לדיוור שיווקי ללא הסכמתכם.",
    ],
  },
  {
    title: "מי מקבל את המידע",
    body: [
      "פרטי הפנייה נשלחים לירין בדוא\"ל באמצעות ספק שירותי דוא\"ל (Resend). האתר מאוחסן אצל Vercel. אם יוגדר חיבור למערכת לניהול פניות, הפרטים יועברו גם אליה.",
      "המידע לא נמכר ולא מועבר לצדדים שלישיים למטרות שיווק.",
    ],
  },
  {
    title: "עוגיות וכלי מדידה",
    body: [
      "האתר אינו משתמש כיום בעוגיות פרסום או בכלי מדידה וניתוח של צד שלישי. אם יתווספו כלים כאלה, מדיניות זו תעודכן.",
    ],
  },
  {
    title: "אבטחת מידע",
    body: [
      "המידע מועבר בחיבור מוצפן (HTTPS). יחד עם זאת, אף מערכת אינה חסינה לחלוטין.",
    ],
  },
  {
    title: "שמירת המידע",
    body: [
      "פרטי הפנייה נשמרים למשך הזמן הנדרש לטיפול בה, אלא אם תבקשו למחוק אותם קודם לכן.",
    ],
  },
  {
    title: "הזכויות שלכם",
    body: [
      "אתם רשאים לבקש לעיין במידע שנשמר עליכם, לתקן אותו או למחוק אותו. לשם כך פנו בדוא\"ל לכתובת שבהמשך.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark">
      <header className="border-b border-white/8">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Image src={IMAGES.logoMark} alt="" width={32} height={34} className="h-8 w-auto" />
            <span className="text-accent-green">ירין</span>
            <span className="text-white">מנוח</span>
          </Link>
          <Link
            href="/"
            className="hero-link inline-flex items-center gap-2 text-sm font-medium text-white/80"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            חזרה לדף הבית
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        {PRIVACY_IS_DRAFT && (
          <p
            role="note"
            className="mb-10 rounded-xl border border-[var(--color-marker)]/40 bg-[var(--color-marker)]/10 px-5 py-4 text-sm leading-relaxed text-white/90"
          >
            <strong>טיוטה לבדיקה.</strong> הנוסח נכתב על בסיס מה שהאתר עושה בפועל,
            ויש לאשר אותו מול ירין ויועץ משפטי לפני העלייה לאוויר.
          </p>
        )}

        <h1 className="text-[clamp(2.2rem,1.4rem+3vw,3.5rem)] leading-[1.05] font-black tracking-[-0.02em]">
          מדיניות פרטיות
        </h1>
        <p className="mt-3 text-sm text-text-secondary">עודכן לאחרונה: אוקטובר 2026</p>

        <div className="mt-12 space-y-10">
          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
              <div className="mt-3 max-w-[65ch] space-y-3 text-lg leading-[1.8] text-white/80">
                {body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-xl font-bold text-white md:text-2xl">יצירת קשר</h2>
            <p className="mt-3 text-lg leading-[1.8] text-white/80">
              לכל שאלה בנושא פרטיות:{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                dir="ltr"
                className="font-medium text-accent-green underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
