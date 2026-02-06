self.addEventListener("push", (e) => {
  let data = {};

  if (e.data) {
    try {
      data = e.data.json();
    } catch {
      data.body = e.data.text();
    }
  }

  const config = {
    body: data.body || "Yeni Makaleye Göz Atın!",
    icon: "/images/logo.png",
    badge: "/images/badge.png",
    vibrate: [100, 50, 100],
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
    self.registration.showNotification(
      data.title || "Yeni Makale Eklendi!",
      config
    )
  );
});
