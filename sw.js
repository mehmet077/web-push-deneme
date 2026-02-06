self.addEventListener("push", (e) => {
  console.log("📨 PUSH GELDİ:", e.data?.text());

  let data = {};

  if (e.data) {
    try {
      data = e.data.json();
    } catch (err) {
      data.body = e.data.text();
    }
  }

  const title = "const başlığı";

  const options = {
    title: "başlık",
    body: "body",
    icon: "/images/logo.png",
    badge: "/images/badge.png",
    vibrate: [100, 50, 100],
    requireInteraction: true, // 🔥 Chrome için çok önemli
    data: {
      url: data.url || "/",
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: "open",
        title: "Aç"
      },
      {
        action: "close",
        title: "Kapat"
      }
    ]
  };

  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});


// 🔔 Bildirime tıklanınca
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "close") return;

  const targetUrl = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
