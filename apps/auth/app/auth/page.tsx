"use client";

import { useRef } from "react";

const docsOrigin = "http://localhost:3001";
const webOrigin = "http://localhost:3002";

const docsReceiverUrl = `${docsOrigin}/auth`;
const webReceiverUrl = `${webOrigin}/auth`;

export default function Page(): JSX.Element {
  const docsIframeRef = useRef<HTMLIFrameElement>(null);
  const webIframeRef = useRef<HTMLIFrameElement>(null);

  const syncTenantNameWithServices = (tenantName: string) => {
    docsIframeRef.current?.contentWindow?.postMessage(
      { tenantName },
      docsOrigin
    );
    webIframeRef.current?.contentWindow?.postMessage({ tenantName }, webOrigin);
  };

  const logInToTenantA = () => {
    syncTenantNameWithServices("tenant-a");
  };
  const logInToTenantB = () => {
    syncTenantNameWithServices("tenant-b");
  };
  const logInToTenantC = () => {
    syncTenantNameWithServices("tenant-c");
  };
  const logOut = () => {
    syncTenantNameWithServices("");
  };

  return (
    <main>
      <h3>ログイン</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div>
          <button onClick={logInToTenantA}>テナントAにログイン</button>
        </div>

        <div>
          <button onClick={logInToTenantB}>テナントBにログイン</button>
        </div>

        <div>
          <button onClick={logInToTenantC}>テナントCにログイン</button>
        </div>

        <div>
          <button onClick={logOut}>ログアウト</button>
        </div>

        <iframe
          src={docsReceiverUrl}
          ref={docsIframeRef}
          style={{ display: "none" }}
        ></iframe>
        <iframe
          src={webReceiverUrl}
          ref={webIframeRef}
          style={{ display: "none" }}
        ></iframe>
      </div>
    </main>
  );
}
