"use client";

import { useEffect, useState } from "react";

export default function Page(): JSX.Element {
  const [tenantName, setTenantName] = useState<string | null | undefined>(
    undefined
  );

  useEffect(() => {
    setTenantName(localStorage.getItem("tenantName"));
  }, []);

  useEffect(() => {
    window.addEventListener("storage", listenStorageAuthEvent);

    return () => {
      window.removeEventListener("storage", listenStorageAuthEvent);
    };
  }, []);

  if (tenantName === undefined) return <p>読み込み中...</p>;

  return (
    <main>
      <h1>Docs</h1>

      {tenantName ? (
        <p>{tenantName}にログインしています。</p>
      ) : (
        <p>ログインしてください</p>
      )}
    </main>
  );
}

const listenStorageAuthEvent = (event: StorageEvent) => {
  if (event.key !== "tenantName") return;

  window.location.reload();
};
