# Egg My House — GMC Track & Field Fundraiser

Live at **[gmceggmyhouse.com](https://gmceggmyhouse.com)**

Fundraiser ordering site for [Greer Middle College](https://greermiddlecollege.org) Track & Field — my high school team where I was a two-time state champion. Families order candy-filled Easter eggs to be scattered in their yard or delivered to their porch on Easter Eve.

Built quickly using agentic AI workflows with Claude Code, which also handled the Cloudflare Workers deployment via API.

## How it works

1. Customer fills out the order form on the site (package, delivery method, address)
2. Order submits to a Google Apps Script web app that logs it to a Google Sheet
3. A confirmation email is automatically sent to the customer with order details

## Tech stack

- **Frontend:** Single-page static site on Cloudflare Workers
- **Backend:** Google Apps Script (order collection + confirmation emails)
- **Storage:** Google Sheets
- **Domain & hosting:** Cloudflare
