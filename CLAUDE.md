# Master Crepes – FrontApp

Vue 3 + TypeScript + Vite frontend for Master Crepes, a French crêperie in Doral, FL.

## Stack
- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Build:** Vite
- **Styles:** SCSS (scoped per component), shared vars in `src/styles/`
- **i18n:** vue-i18n — all user-facing strings live in `src/locales/en.json` and `src/locales/es.json`
- **Package manager:** pnpm

## Project Structure
```
src/
  components/
    catering/     # CateringForm, CateringHero, CateringInfo
    contact/      # ContactForm, ContactHero, ContactInfo
    franchises/   # FranchiseForm, FranchiseBenefits, FranchiseComingSoon, FranchiseHero
    home/         # HeroSection, WelcomeSection, MenuHighlights, CateringTeaser
    layout/       # TheHeader, TheFooter, TheTopBar
    ui/           # CustomDatePicker, CustomTimePicker, PhoneInput, WhatsAppButton
  locales/        # en.json, es.json — ALL copy lives here
  views/          # Page-level components
  styles/         # Global SCSS, color/layout variables
  services/       # GHL (GoHighLevel) API, httpBase
```

## Business Info
- **Business:** Master Crepes
- **Address:** 3905 NW 107th Ave Suite 106, Doral, FL 33178
- **Phone:** (786) 478-2727
- **Toll-free:** +1 (866) 827-3737
- **Email:** info@themastercrepes.com
- **Instagram:** https://www.instagram.com/mastercrepesdoral/
- **Facebook:** https://www.facebook.com/mastercrepes1/
- **Online orders:** https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106

## Images
- Hosted on **Cloudinary** (cloud: `dpjzfua3n`)
- All image URLs should use Cloudinary public URLs
- Old URLs from `www.themastercrepes.com/wp-content/uploads/` are broken — do not use

## Key Rules
- Never edit copy directly in `.vue` files — add/edit keys in `src/locales/*.json`
- All phone numbers must be real: `(786) 478-2727` and `+1 (866) 827-3737`
- Address must always be: `3905 NW 107th Ave Suite 106, Doral, FL 33178`
- Use `pnpm` (not npm or yarn)

## Dev Commands
```bash
pnpm dev       # Start dev server
pnpm build     # Production build
pnpm preview   # Preview build
```
