// simpleControls.js

export function createSimpleControls() {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "10px";
  container.style.right = "10px";
  container.style.zIndex = "1000";
  container.style.userSelect = "none";
  container.style.display = "flex";
  container.style.gap = "10px";

  // Pause button
  const pauseBtn = document.createElement("button");
  pauseBtn.textContent = "Pause";
  pauseBtn.style.padding = "6px 12px";
  pauseBtn.style.cursor = "pointer";

}