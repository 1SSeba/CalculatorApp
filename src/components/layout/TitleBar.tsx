import "./TitleBar.css";

export function TitleBar() {
  async function handleMinimize() {
    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    await getCurrentWindow().minimize();
  }

  async function handleMaximize() {
    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    const appWindow = getCurrentWindow();
    const isMaximized = await appWindow.isMaximized();
    if (isMaximized) {
      await appWindow.unmaximize();
    } else {
      await appWindow.maximize();
    }
  }

  async function handleClose() {
    const { getCurrentWindow } = await import("@tauri-apps/api/window");
    await getCurrentWindow().close();
  }

  return (
    <div className="titlebar">
      <div className="titlebar-drag" data-tauri-drag-region>
        <span className="titlebar-title">Calculadora</span>
      </div>
      <div className="titlebar-buttons">
        <button
          className="titlebar-btn minimize"
          onClick={handleMinimize}
          title="Minimizar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect fill="currentColor" width="10" height="1" x="1" y="6" />
          </svg>
        </button>
        <button
          className="titlebar-btn maximize"
          onClick={handleMaximize}
          title="Maximizar"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              width="9"
              height="9"
              x="1.5"
              y="1.5"
            />
          </svg>
        </button>
        <button
          className="titlebar-btn close"
          onClick={handleClose}
          title="Cerrar"
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path
              fill="currentColor"
              d="M1.7 0.3L0.3 1.7 3.6 5 0.3 8.3 1.7 9.7 5 6.4 8.3 9.7 9.7 8.3 6.4 5 9.7 1.7 8.3 0.3 5 3.6z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
