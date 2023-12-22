"use client";

import { useEffect, useState } from "react";

const authOrigin = "http://localhost:3000";
const embeddedAuthUrl = `${authOrigin}/embedded`;

export default function Page(): JSX.Element {
  const [tenantName, setTenantName] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    setTenantName(localStorage.getItem("tenantName"));
  }, []);

  useEffect(() => {
    window.addEventListener("message", receiveAuthMessage);

    return () => {
      window.removeEventListener("message", receiveAuthMessage);
    };
  }, []);

  if (tenantName === undefined) return <p>読み込み中...</p>;

  return (
    <main>
      <h1>Web with embedded auth</h1>

      {tenantName ? (
        <p>{tenantName}にログインしています。</p>
      ) : (
        <p>ログインしてください</p>
      )}

      <iframe src={embeddedAuthUrl} style={{ display: "none" }} />
    </main>
  );
}

const receiveAuthMessage = (event: MessageEvent<{ tenantName: string }>) => {
  if (event.origin !== authOrigin) return;
  if (typeof event.data.tenantName === "undefined") return;

  if (event.data.tenantName) {
    localStorage.setItem("tenantName", event.data.tenantName);
  } else {
    localStorage.removeItem("tenantName");
  }

  window.location.reload();
};
