# Aspire Community Support website

Static website scaffold for Aspire Community Support.

Open `index.html` in a browser to preview the site.

## Image paths

Images must be inside this website folder before publishing.

Use these folders:
- Team and board photos: `assets/team/`
- Page hero images: `assets/hero/`
- News, events, and story images: `assets/news-events/`
- General site images: `assets/`

Use relative paths in data files:

```js
image: "assets/team/david-darling.jpg"
```

Do not use local computer paths such as:

```js
image: "C:\\Users\\Admin\\Downloads\\photo.jpg"
```

Do not use browser-only file URLs such as:

```js
image: "file:///C:/Users/Admin/Downloads/photo.jpg"
```

Those paths only work on your computer and will break after the site is published.

## Updating page hero images

Page hero images are stored in `assets/hero/` and assigned in `styles.css`.

Current hero image groups:
- `about-team-hero.png`: About, Board, Team
- `services-hero.png`: What We Offer, Referral, Funding & Eligibility
- `advocacy-hero.png`: Self Advocacy, Stories, News & Events
- `foundation-hero.png`: Foundation
- `contact-hero.png`: Contact, Join, Application, Feedback

Keep hero images calm, professional, and low-clutter. Avoid readable text inside images, logos, staged stock-photo scenes, or anything that reduces page title readability.

Before launch, confirm or add:
- `downloads/sil-flier.jpg` with the real SIL flyer
- Social media links if Aspire wants them shown
- Staff photos, leadership profiles, final complaints policy wording, vacancies, and final form integration
- A secure form provider for the contact/referral/application forms. The current static forms are intentionally blocked from submitting so personal details are not placed in the page URL.

## Security notes

Security hardening added:
- Dynamic cards use DOM APIs and `textContent`, not raw HTML rendering.
- Data-file links and images are restricted to safe relative URLs, plus `mailto:`, `tel:`, `http:`, and `https:` where links are expected.
- PDF links that open a new tab use `rel="noopener noreferrer"`.
- Contact, referral, and application forms are blocked until connected to a secure backend or form provider.
- `_headers` and `vercel.json` include strict browser security headers for common static hosts.

Before going live:
- Host only over HTTPS.
- Connect the form to a trusted provider with spam protection.
- Limit who can edit data files and upload PDFs/images.
- Keep admin passwords and hosting accounts protected with MFA.

## Updating newsletters

1. Upload the new PDF to `downloads/newsletters/`.
2. Open `newsletter-data.js`.
3. Add a new entry at the top of `window.AspireNewsletters`.
4. The archive on `news-events.html` will update automatically.

Example:

```js
{
  title: "Spring 2025 Newsletter",
  season: "Spring",
  year: "2025",
  file: "downloads/newsletters/spring-2025-newsletter.pdf",
  description: "Aspire Community Support spring update."
}
```

## Updating news and events

News posts, events, and stories are managed in `news-events-data.js`.

To add an image:
1. Upload the image to `assets/news-events/`.
2. Add its path to the `image` field, for example `assets/news-events/open-day.jpg`.

To add a news post, add a new entry at the top of `window.AspireNewsPosts`.

```js
{
  title: "Foundation community day",
  date: "2026-07-15",
  category: "Foundation",
  image: "assets/news-events/foundation-community-day.jpg",
  summary: "A short summary of the update.",
  link: ""
}
```

## Updating testimonials

Site-wide testimonials are managed in `testimonials-data.js`.

Add short, consent-approved quotes to `window.AspireTestimonials`.

```js
{
  quote: "Aspire supports people to shape the life they choose.",
  name: "Aspire story",
  context: "Person-directed support"
}
```

These testimonials auto-scroll above the footer on every page. Keep quotes short and avoid private health, family, behavioural, or financial details unless explicit written consent has been obtained.

## Updating job openings and expressions of interest

Current job openings and expressions of interest are managed in `careers-data.js`.

Add current advertised roles to `window.AspireJobOpenings`.

```js
{
  title: "Support Worker",
  type: "Full time",
  location: "Hamilton",
  closingDate: "2026-07-30",
  summary: "Short role summary.",
  link: "application.html?role=Support%20Worker"
}
```

Use `closingDate: "Open until filled"` if there is no fixed closing date.

Ongoing expressions of interest are managed in `window.AspireVacancies`.

```js
{
  title: "Foundation Community Support",
  type: "Expressions of interest",
  location: "Hamilton / Waikato",
  closingDate: "Open",
  summary: "Register your interest for future Foundation support roles.",
  link: "application.html?role=Foundation%20Community%20Support"
}
```

## Connecting applications to SharePoint

SharePoint Lists are a suitable place to store application records if Aspire already uses Microsoft 365. For CVs and cover letters, use a SharePoint document library rather than storing file contents directly in list columns.

Recommended setup:
- SharePoint List: `Website Applications`
- SharePoint document library: `Recruitment Documents`
- Power Automate flow: triggered by the website form, creates the list item, saves uploaded files to the document library, emails HR or the recruitment contact, and optionally sends an acknowledgement email to the applicant.

Suggested list columns:
- Role
- First name
- Last name
- Email
- Phone
- Location
- Availability
- Cover letter text
- CV file link
- Cover letter file link
- Consent received
- Submitted date
- Status
- Notes

Do not publish the application form as active until the SharePoint or recruitment workflow is connected and tested over HTTPS.

## Updating team and board profiles

Team profiles are managed in `team-data.js`.
Board profiles are managed in `board-data.js`.

To add a photo:
1. Upload the image to `assets/team/`.
2. Add the image path to the relevant person, for example `assets/team/david-darling.jpg`.

Team example:

```js
{
  name: "Person Name",
  role: "Support Manager",
  image: "assets/team/person-name.jpg",
  bio: "Optional short bio."
}
```

Board example:

```js
{
  name: "Board Member",
  role: "Board Member",
  image: "assets/team/board-member.jpg",
  bio: "Approved profile text."
}
```

To add an event, add a new entry at the top of `window.AspireEvents`.

```js
{
  title: "Self-advocacy meeting",
  date: "2026-08-10",
  time: "10:00am",
  location: "103 Tawa Street, Melville, Hamilton",
  category: "Self Advocacy",
  image: "assets/news-events/self-advocacy-meeting.jpg",
  summary: "A short description of who the event is for and what will happen.",
  link: "contact.html"
}
```

To add a story or testimonial, add a new entry at the top of `window.AspireStories`.

```js
{
  title: "Building confidence in the community",
  person: "Foundation story",
  image: "assets/news-events/foundation-story.jpg",
  summary: "A short consent-approved summary.",
  quote: "A short approved quote.",
  link: ""
}
```

Story reminders:
- Get clear consent before publishing.
- Avoid sensitive personal, health, financial, family, or behavioural details.
- Focus on strengths, choices, goals, relationships, and community connection.
