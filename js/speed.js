// speed.js

// Speed object shared with main.js
export const speed = {
  mercury: 2.0,
  venus: 1.5,
  earth: 1.0,
  mars: 0.8,
  jupiter: 0.7,
  saturn: 0.6,
  uranus: 0.5,
  neptune: 0.4,
};

// Create speed control UI panel
export function createSpeedControls() {
  const panel = document.createElement("div");
  panel.style.position = "absolute";
  panel.style.top = "10px";
  panel.style.left = "10px";
  panel.style.padding = "10px";
  panel.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  panel.style.color = "white";
  panel.style.fontFamily = "Arial, sans-serif";
  panel.style.zIndex = "100";

  for (let planet in speed) {
    const label = document.createElement("label");
    label.innerText = `${planet.charAt(0).toUpperCase() + planet.slice(1)}: `;
    label.style.display = "block";
    label.style.marginBottom = "4px";

    const input = document.createElement("input");
    input.type = "range";
    input.min = "0.1";
    input.max = "5.0";
    input.step = "0.1";
    input.value = speed[planet];
    input.style.width = "150px";

    const span = document.createElement("span");
    span.innerText = ` ${input.value}`;

    input.addEventListener("input", (e) => {
      const newSpeed = parseFloat(e.target.value);
      speed[planet] = newSpeed;
      span.innerText = ` ${newSpeed.toFixed(1)}`;
    });

    label.appendChild(input);
    label.appendChild(span);
    panel.appendChild(label);
  }

  document.body.appendChild(panel);
}
