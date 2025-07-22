const colorPicker = document.getElementById("color-picker");
const mode = document.getElementById("colors");
const colorSchemeBtn = document.getElementById("color-scheme-btn");
const colorCode = document.getElementById("color-code");

colorSchemeBtn.addEventListener("click", async (e) => {
  const colorPickerCode = colorPicker.value.slice(1);
  const colorTab = document.querySelectorAll(".hex-color");
  const hexCode = document.querySelectorAll("#color-code");

  const resp = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPickerCode.toUpperCase()}&mode=${mode.value.toLowerCase()}&count=5`
  );
  const data = await resp.json();
  colorTab.forEach((div, index) => {
    div.style.backgroundColor = data.colors[index].hex.value;
  });

  hexCode.forEach((code, index) => {
    code.textContent = data.colors[index].hex.value;
    code.addEventListener("click", async (e) => {
      console.log(e.target.textContent);
      try {
        await navigator.clipboard.writeText(e.target.textContent);
      } catch (err) {
        alert("Failed to Copy");
      }
    });
  });
});
