
const btnScroll = document.getElementById("btnScroll");
btnScroll.addEventListener("click", () => {
  document.getElementById("setup").scrollIntoView({ behavior: "smooth" });
});

// 2) Toggle tema (simple)
const btnTheme = document.getElementById("btnTheme");
let lightMode = false;

btnTheme.addEventListener("click", () => {
  lightMode = !lightMode;

  if (lightMode) {
    document.documentElement.style.setProperty("--bg", "#f7f7fb");
    document.documentElement.style.setProperty("--text", "#121318");
    document.documentElement.style.setProperty("--muted", "rgba(18,19,24,0.75)");
    document.documentElement.style.setProperty("--card", "rgba(0,0,0,0.04)");
    document.documentElement.style.setProperty("--border", "rgba(0,0,0,0.12)");
    btnTheme.textContent = "Modo oscuro";
  } else {
    document.documentElement.style.setProperty("--bg", "#0e0f14");
    document.documentElement.style.setProperty("--text", "#f2f2f2");
    document.documentElement.style.setProperty("--muted", "rgba(242,242,242,0.75)");
    document.documentElement.style.setProperty("--card", "rgba(255,255,255,0.06)");
    document.documentElement.style.setProperty("--border", "rgba(255,255,255,0.12)");
    btnTheme.textContent = "Cambiar modo";
  }
});

// 3) Recomendación del setup (form)
const setupForm = document.getElementById("setupForm");
const resultado = document.getElementById("resultado");

setupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const uso = document.getElementById("uso").value;
  const prefs = [...document.querySelectorAll(".pref:checked")].map(x => x.value);

  let msg = `Uso: ${uso}. `;

  if (prefs.length === 0) {
    msg += "Tip: marca al menos una preferencia para una recomendación más precisa.";
  } else {
    if (prefs.includes("freno")) msg += "Recomendación: prioriza freno delantero y práctica de frenada progresiva. ";
    if (prefs.includes("llantas")) msg += "Recomendación: revisa presión y busca llantas con buen agarre para asfalto. ";
    if (prefs.includes("suspension")) msg += "Recomendación: ajusta suspensión para estabilidad (sin rebote excesivo). ";
  }

  resultado.textContent = msg;
});

// 4) Filtro de galería
const chips = document.querySelectorAll(".chip");
const photos = document.querySelectorAll(".photo");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const filter = chip.dataset.filter;

    photos.forEach(photo => {
      const tag = photo.dataset.tag;
      const show = (filter === "all" || filter === tag);
      photo.style.display = show ? "block" : "none";
    });
  });
});

// 5) Checklist progreso + botón volver arriba
const todo = document.getElementById("todo");
const progreso = document.getElementById("progreso");
const toTop = document.getElementById("toTop");

function updateProgress() {
  const checks = todo.querySelectorAll('input[type="checkbox"]');
  const done = [...checks].filter(c => c.checked).length;
  progreso.textContent = `Progreso: ${done}/${checks.length}`;
}

todo.addEventListener("change", updateProgress);
updateProgress();

// toTop aparece al bajar
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) toTop.style.display = "block";
  else toTop.style.display = "none";
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form contacto (solo demo)
const contactForm = document.getElementById("contactForm");
const contactResult = document.getElementById("contactResult");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  contactResult.textContent = "✅ Mensaje enviado (demo). Puedes conectarlo a backend después.";
  contactForm.reset();
});
