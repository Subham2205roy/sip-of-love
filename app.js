const $ = (id) => document.getElementById(id);
const intervalSelect = $("interval");
const startButton = $("start");
const stopButton = $("stop");
const statusText = $("status");
const countText = $("count");

const messages = [
  "A little sip, please? I'm cheering for you 💗",
  "Hydration break, Sweaty! Your water is waiting 💧",
  "Drink a little water for me? Pretty please 🥺",
  "Pause, take a sip, and come back glowing ✨",
  "Your reminder that you are loved — and need water too 💕"
];

let timer = null;
let lastReminderAt = Number(localStorage.getItem("lastReminderAt") || 0);
let count = Number(localStorage.getItem("waterCount") || 0);
countText.textContent = count;

async function getRegistration() {
  if (!("serviceWorker" in navigator)) throw new Error("Service workers are not supported in this browser.");
  return navigator.serviceWorker.ready;
}

async function notify() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  const registration = await getRegistration();
  await registration.showNotification("A little sip of love 💗", {
    body: message,
    icon: "/icon.svg",
    badge: "/icon.svg",
    tag: "water-reminder",
    renotify: true
  });
}

async function checkReminder() {
  const intervalMs = Number(intervalSelect.value) * 60 * 1000;
  if (Date.now() - lastReminderAt >= intervalMs) {
    try {
      await notify();
      lastReminderAt = Date.now();
      localStorage.setItem("lastReminderAt", String(lastReminderAt));
      statusText.textContent = "A little reminder has been sent 💌";
    } catch (error) {
      statusText.textContent = error.message;
    }
  }
}

async function startReminders() {
  if (!("Notification" in window)) {
    statusText.textContent = "This browser does not support notifications.";
    return;
  }
  if (!("serviceWorker" in navigator)) {
    statusText.textContent = "Please open this in Chrome on Android.";
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    statusText.textContent = "Please allow notifications to receive reminders.";
    return;
  }

  if (!lastReminderAt) {
    lastReminderAt = Date.now();
    localStorage.setItem("lastReminderAt", String(lastReminderAt));
  }
  if (timer) clearInterval(timer);
  timer = setInterval(checkReminder, 15000);
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalSelect.disabled = true;
  statusText.textContent = "Reminders are on. Keep this app open 💗";
}

function stopReminders() {
  if (timer) clearInterval(timer);
  timer = null;
  startButton.disabled = false;
  stopButton.disabled = true;
  intervalSelect.disabled = false;
  statusText.textContent = "Reminders paused. Take care, sunshine ♡";
}

$("addWater").addEventListener("click", () => {
  count += 1;
  localStorage.setItem("waterCount", String(count));
  countText.textContent = count;
});

startButton.addEventListener("click", startReminders);
stopButton.addEventListener("click", stopReminders);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      statusText.textContent = "Could not set up notifications: " + error.message;
    });
  });
}
