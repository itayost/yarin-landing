# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## What it is

Single-page Hebrew (RTL) landing site for Yarin Manoah (ירין מנוח), a personal trading mentor. It sells 1-on-1 mentoring in stocks, options, futures and crypto, tailored to the student's level. Not a recorded course: Yarin accompanies each student personally through learning, analysis and execution, with the goal that the student trades independently.

## Users and job

- Primary visitors: both beginners starting from zero and experienced traders who want to level up (including people burned by recorded courses).
- Job: decide whether personal mentoring with Yarin is worth a conversation, then leave contact details.
- Primary action: the contact form (scroll to `#contact`, CTA "בוא נדבר"). WhatsApp and phone are secondary channels.

## Evidence and claims (confirmed)

Source of copy: owner PDF "דוגמאות ותכנים מילוליים" (2026-10); the copy lives in `src/lib/content.ts`.

- Yarin | מנטור למסחר והשקעות. B.Sc. software engineer; day trader in futures (נוסטרו); invests in stocks and crypto; 6+ years of experience.
- Works at the Phoenix investment house (הפניקס); in the specialization process toward the portfolio management license (התמחות לרישיון ניהול תיקי השקעות). He does NOT hold the license yet; never write that he does.
- Lecturer at one of Israel's leading colleges (a review names Wise college).
- Has mentored 100+ students.
- Method: 1-on-1 only, in front of the screens, no recorded courses, no mass colleges, every session recorded and sent to the student, full WhatsApp availability during the mentoring, starts with risk-free practice before opening an account.
- Explicit stance: no promise of profits (FAQ). Copy must not promise returns.
- Performance figures ($12,450 portfolio, +24.8%, 87% win rate, 142 trades, profit factor 2.4) were confirmed by the owner as real but removed from the page at the owner's request (2026-10-13). If ever shown again, they need the performance disclaimer beside them.
- Hero trust badges, owner wording: "6+ שנות ניסיון", "B.Sc + התמחות לרישיון ניהול תיקים", "מרצה ללימוד השקעות במניות, קריפטו וחוזים עתידיים".
- Testimonials: only the two real public 5-star reviews (חנן אביאל, Asher Malja). Student WhatsApp messages and the student's funded-account screenshot need student consent before use. Never publish the Tradovate credentials email screenshot.

## Required disclaimers

- Next to any trade example or result: "הדוגמאות מוצגות לצורכי לימוד והמחשה בלבד. אין לראות בהן ייעוץ השקעות, המלצה לפעולה או הבטחה לתוצאה."
- Site-wide (footer): "אין לראות במידע באתר ייעוץ פיננסי, ייעוץ השקעות או הבטחה לתשואה. מסחר בשוק ההון ובחוזים עתידיים כרוך בסיכון ועלול לגרום להפסדים. הנתונים מוצגים לצורכי המחשה בלבד. ביצועי עבר אינם מבטיחים תוצאות עתידיות."

## Assets

- Portrait: `public/images/yarin-portrait.webp` (owner photo "תמונה למי אני").
- Logo: owner "YM TRADING" 3D render; light cut-outs in `public/images/logo-mark.png` / `logo-full.png`; favicon `src/app/icon.png`.
- Real trade screenshots: `public/images/trades/trade-1..5.webp`; hero wall `public/images/hero-trades.webp`.
- Socials: x.com/yarinmanoah, instagram.com/yarinmanoah. Affiliate links: Interactive Brokers (lp3.inter-il.com/ab/742), TradingView (aff_id=169916).
- Owner reference sites: orelkakoon.com, danieldamari.co.il, lidorfx.co.il, sodot.co.il/course/the-lab, shakedasher.com, tlh-academy.com.

## Contact form (owner spec, 2026-10-13)

Fields: name, phone, and a required dropdown "מה הדבר העיקרי שהיית רוצה לקבל ממני במהלך הליווי?" (options in `GOAL_OPTIONS`, validated server-side). No packages are offered on the page.

## Constraints

- Hebrew, RTL, `lang="he"`. All copy in Hebrew; trading terms may stay in English (Win Rate, Profit Factor, tickers).
- Stack: Next.js (App Router) + Tailwind v4 + framer-motion, deployed on Vercel. Contact via `/api/contact` (Resend).
- Accessibility: respect reduced motion; keep CTA reachable by keyboard.

## Open decisions

- Hero headline "תתחיל להרוויח מהשוק" reads as a profit promise, which conflicts with the owner's own FAQ ("no promise of profits").
- Hero subtitle lists options; the owner's copy names futures, stocks and crypto.
- Two lines from the owner's own copy also lean toward results: the approach promise "ויודע לייצר ולהגדיל רווחים בעצמך" and the fit item "שאיפה ברורה לייצר הון ולהצמיח אותו".
- Privacy policy: the form collects name and phone; the site has no privacy policy page yet (the dead footer link was removed).
- Domain: owner considering yarinmanoah (namecheap).
