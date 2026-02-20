# GMC Egg My Yard — Website Design

## Overview

Single-page fundraiser website for GMC Track & Field's annual "Egg My Yard" fundraiser. Customers order candy-filled Easter eggs to be scattered in their yard (or placed in a basket on the porch) on Easter Eve. Payment is handled by SecureGive.

**Domain:** gmceggmyhouse.com (registered on Cloudflare)
**Hosting:** Cloudflare Pages
**Payment:** SecureGive at app.securegive.com/greermiddlecollege

## Packages

| Package   | Price |
|-----------|-------|
| 30 Eggs   | $25   |
| 50 Eggs   | $35   |
| 75 Eggs   | $45   |
| 100 Eggs  | $60   |
| 200 Eggs  | $100  |
| Golden Egg add-on | +$5 |

## Key Dates (Easter 2026 = April 5)

- Order deadline: March 28, 2026
- Delivery: April 4, 2026 (Easter Eve)

## Branding

- School: Greer Middle College Charter High School (GMC Blazers)
- Location: Taylors, SC
- Colors: Purple (#442e66), Gold (#ffb606), Light blue accent (#8dd8f8)
- Easter/spring theme

## Page Layout

Single scrolling page, mobile-first:

### 1. Hero
Easter-themed header with GMC branding. "Egg My Yard" title, short pitch, countdown to order deadline, delivery date.

### 2. How It Works
Three steps: Pick your package → We deliver Easter Eve → Kids wake up to eggs.

### 3. Order Form
- Name
- Email
- Phone
- Delivery address (street, city, state, zip)
- Package selection (radio buttons with prices)
- Golden Egg add-on (checkbox, +$5)
- Delivery method: yard scatter vs. basket on porch (radio)
- Notes (allergies, gate code, dog in yard, etc.)
- Running total updates live

### 4. Confirmation Screen
Replaces form after submit. Shows order summary, total, and "Pay $XX on SecureGive" button that opens SecureGive in a new tab. Clear instruction to enter the shown amount.

## Technical Design

### Stack
Single `index.html` with inline CSS and JS. No build tools, no frameworks, no dependencies.

### Order Collection — Google Sheets
- Google Sheet with columns: Timestamp, Name, Email, Phone, Address, City, State, Zip, Package, Golden Egg, Delivery Method, Notes, Total
- Google Apps Script deployed as web app (public, executes as sheet owner)
- Form POSTs JSON to the Apps Script URL
- Script appends a row to the sheet
- Orders are recorded regardless of payment completion (team can follow up)

### SecureGive Handoff
- Confirmation screen calculates and displays the total
- "Pay on SecureGive" button opens app.securegive.com/greermiddlecollege in new tab
- Instructions tell the customer to enter the displayed amount

### Deadline Enforcement
- Client-side date check disables the form after March 28, 2026
- Shows "Orders are closed" message

### Deployment
- Single index.html uploaded to Cloudflare Pages via drag-and-drop
- Connected to gmceggmyhouse.com domain

## Setup Steps (for the team)

1. Create a Google Sheet
2. Add Apps Script (provided) and deploy as web app
3. Copy the web app URL into the site's config
4. Upload index.html to Cloudflare Pages
5. Connect domain
