const darkLight = document.querySelector(".dark-light");
const darkLightImg = document.querySelector(".dark-light img");
const darkModeBoolean = JSON.parse(localStorage.getItem("darkMode") || false);
const headerSection = document.querySelector("header");
console.log(headerSection);

console.log(darkModeBoolean);

document.body.classList.add("animate__animated", "animate__fadeIn");
document.body.style.animationDelay = "1s";

fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    function renderCards(data) {
      const cardList = document.querySelector(".cards-list");
      cardList.innerHTML = "";
      data.forEach((extension) => {
        const card = document.createElement("div");
        card.classList.add("card", "animate__animated", "animate__fadeIn");
        card.innerHTML = `
          <section class="img-detail">
            <article>
              <img src="${extension.logo}" />
            </article>
            <div class="details">
              <h4>${extension.name}</h4>
              <p>${extension.description}</p>
            </div>
          </section>
          <div class="remove-toggle">
            <button class="remove-btn">Remove</button>
            <div>
              <label class="toggle">
  <input type="checkbox" class="toggle-input" ${
    extension.isActive ? "checked" : ""
  }>
  <span class="toggle-slider"></span>
</label>
          </div>`;
        const toggle = card.querySelector(".toggle-input");
        toggle.addEventListener("change", function () {
          extension.isActive = this.checked;
        });
        cardList.appendChild(card);
        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
          // Add slide-out animation before removal
          card.classList.add("animate__animated", "animate__zoomOut");

          setTimeout(() => {
            card.remove(); // remove card from DOM
            data = data.filter((item) => item.name !== extension.name); // remove from data array
            // Optionally persist this change:
            // localStorage.setItem('extensions', JSON.stringify(data));
          }, 500); // Wait for the slide-out animation to complete before removing
        });
      });
    }
    renderCards(data);

    document.getElementById("all").addEventListener("click", () => {
      renderCards(data);
    });

    document.getElementById("active").addEventListener("click", () => {
      renderCards(
        data.filter((active) => {
          return active.isActive;
        })
      );
    });

    document.getElementById("inactive").addEventListener("click", () => {
      renderCards(
        data.filter((active) => {
          return active.isActive === false;
        })
      );
    });
  });

// Dark/Light Mode Handling
if (darkModeBoolean) {
  document.body.classList.add("dark");
  darkLightImg.src = "./assets/images/icon-sun.svg";
  darkLightImg.alt = "sun";
} else {
  darkLightImg.alt = "moon";
}

darkLight.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  darkLightImg.classList.remove("animate__fadeIn");
  void darkLightImg.offsetWidth; // Force reflow for animation

  if (document.body.classList.contains("dark")) {
    darkLightImg.src = "./assets/images/icon-sun.svg";
    darkLightImg.alt = "sun";
  } else {
    darkLightImg.src = "./assets/images/icon-moon.svg";
    darkLightImg.alt = "moon";
  }

  darkLightImg.classList.add("animate__animated", "animate__fadeIn");

  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});
