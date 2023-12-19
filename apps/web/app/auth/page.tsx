"use client";

import { useEffect } from "react";

const authOrigin = "http://localhost:3000";

export default function Page(): JSX.Element {
  useEffect(() => {
    window.addEventListener("message", receiveAuthMessage);

    return () => {
      window.removeEventListener("message", receiveAuthMessage);
    };
  }, []);

  return <></>;
}

const receiveAuthMessage = (event: MessageEvent<{ tenantName: string }>) => {
  if (event.origin !== authOrigin) return;
  if (typeof event.data.tenantName === "undefined") return;

  if (event.data.tenantName) {
    localStorage.setItem("tenantName", event.data.tenantName);
  } else {
    localStorage.removeItem("tenantName");
  }
};
