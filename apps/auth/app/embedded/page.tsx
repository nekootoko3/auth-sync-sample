"use client";

import { useEffect } from "react";

export default function Page(): JSX.Element {
  useEffect(() => {
    window.addEventListener("storage", postMessageToParent);

    return () => {
      window.removeEventListener("storage", postMessageToParent);
    };
  }, []);

  return <></>;
}

const postMessageToParent = (event: StorageEvent) => {
  if (event.key !== "tenantName") return;

  window.parent.postMessage({ tenantName: event.newValue }, "*");
};
