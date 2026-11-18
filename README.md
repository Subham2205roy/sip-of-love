# A Little Sip of Love 💗

A tiny installable PWA starter for Android Chrome.

## Important limitation
This starter uses a timer in the open webpage. Notifications can appear while the page is open (including when it is in the background, subject to Android/Chrome throttling), but reminders are **not guaranteed** if the app/tab is closed, the browser is stopped, or the phone restricts background activity.

Reliable reminders while the app is fully closed require a push-notification backend and a server-side scheduler. This starter deliberately avoids a backend and costs nothing to host.

## Deploy with Cloudflare Pages
1. Create a GitHub repository and upload all files in this folder to its root.
2. In Cloudflare Dashboard, open Workers & Pages → Create → Pages → Connect to Git.
3. Select the repository.
4. Framework preset: None. Build command: leave blank. Build output directory: `/` (or `.` if the dashboard requires it).
5. Deploy. Cloudflare gives you an `*.pages.dev` HTTPS URL.
6. Open that URL in Android Chrome, use ⋮ → Add to Home screen / Install app.
7. Open the installed app, tap Turn on my reminders, and allow notifications.

## Local testing
A service worker requires HTTPS or localhost. Do not test by opening index.html directly as a file.
