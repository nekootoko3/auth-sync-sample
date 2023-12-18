"use client";

export default function Page(): JSX.Element {
  const logInToTenantA = () => {
    localStorage.setItem("tenantName", "tenant-a");
  };
  const logInToTenantB = () => {
    localStorage.setItem("tenantName", "tenant-b");
  };
  const logInToTenantC = () => {
    localStorage.setItem("tenantName", "tenant-c");
  };
  const logOut = () => {
    localStorage.removeItem("tenantName");
  };

  return (
    <main>
      <h3>認証</h3>

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
      </div>
    </main>
  );
}
