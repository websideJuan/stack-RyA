export class Alert {
  constructor() {
    this.alertContainer = null;
    this.alert = null;
    this.count = 0;
  }
  show(message, type = "info") {
    this.alertContainer = document.createElement("div");
    this.alert = document.createElement("ul");
    this.alertContainer.className = `notification notification-${type}`;
    this.alertContainer.style.display = "flex";
    this.alert.textContent = message;

    this.alertContainer.appendChild(this.alert);
    document.querySelector("body").appendChild(this.alertContainer);

    let heightContainer = document.querySelector("body").scrollHeight;
    this.alertContainer.animate(
      [
        { transform: "translateY(0%)" },
        { transform: `translateY(${heightContainer - this.count}px)` },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );

    this.count = this.count + (this.alertContainer.scrollHeight + 10);

    const elements = document.querySelectorAll(".notification");

    setTimeout(() => {
      elements.forEach((element) => element.remove());
      this.count = 0;
      this.alertContainer.remove();
    }, 1200);
  }
}

export const alert = new Alert();
