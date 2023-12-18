"use client";

import { useRef } from "react";

const docsOrigin = "http://localhost:3001";
const webOrigin = "http://localhost:3002";

const docsReceiverUrl = `${docsOrigin}/auth`;
const webReceiverUrl = `${webOrigin}/auth`;

export default function Page(): JSX.Element {
  const docsIframeRef = useRef<HTMLIFrameElement>(null);
  const webIframeRef = useRef<HTMLIFrameElement>(null);

  const postTenantNameToServices = (tenantName: string) => {
    docsIframeRef.current?.contentWindow?.postMessage(
      { tenantName },
      docsOrigin
    );
    webIframeRef.current?.contentWindow?.postMessage({ tenantName }, webOrigin);
  };

  const logInToTenantA = () => {
    postTenantNameToServices("tenant-a");
  };
  const logInToTenantB = () => {
    postTenantNameToServices("tenant-b");
  };
  const logInToTenantC = () => {
    postTenantNameToServices("tenant-c");
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
