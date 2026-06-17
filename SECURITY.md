# Aspire website security checklist

## Before launch

- Host the site only over HTTPS.
- Enable MFA on the hosting, domain, email, and repository accounts.
- Connect the contact form to a trusted secure form provider before accepting submissions.
- Confirm the host applies `_headers` or `vercel.json` security headers.
- Upload only trusted PDFs and images.
- Scan PDFs before upload.
- Limit who can edit `*-data.js` files and upload files.
- Keep backups of the published site.

## Current hardening

- Dynamic cards render with DOM APIs and `textContent`, not raw HTML.
- Links/images from data files are checked before use.
- New-tab links use `noopener noreferrer`.
- The static form is blocked until a secure submission endpoint is connected.
- Browser security headers are included for common static hosts.

## Ongoing updates

- Do not paste embed codes, scripts, iframes, or third-party widgets into data files.
- Use relative paths for uploaded images and PDFs.
- Keep personal stories consent-approved and privacy-safe.
- Remove old staff, vacancy, event, or contact details quickly when they change.
