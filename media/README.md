# Media Folder — Development Strategies

Place your assets in this folder:

## Logo
- `media/logo.png`       ← Main logo (referenced throughout the site)
- `media/logo-white.png` ← White version for dark backgrounds (optional)

The site will gracefully hide the logo image if the file is not found (onerror handler),
and fall back to the text-based logo. Simply drop your PNG/SVG logo here named `logo.png`.

## Team Photos (optional)
- `media/team/moazzam.jpg`   ← Dr. Moazzam Khalil
- `media/team/ahsan.jpg`     ← Dr. Ahsan Maqbool Ahmad
- `media/team/zulfiqar.jpg`  ← Zulfiqar Haider
- `media/team/khalid.jpg`    ← Dr. Muhammad Khalid

Team photos are optional — emoji avatars are shown as fallback.

## Favicon (optional)
- `media/favicon.ico`
- `media/favicon.png`

Add `<link rel="icon" href="media/favicon.png" />` to each HTML file's <head> section.
