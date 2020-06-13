export default function PharmacyList({ $target, data, onClick }) {
    this.$target = $target;
    this.data = data;
  
    this.$target.addEventListener("click", (e) => {
      const $li = e.target.closest("li");
      const { index } = $li.dataset;
  
      const { lat, lng } = this.data.stores[parseInt(index)];
      onClick({
        lat,
        lng,
      });
    });
  
    this.render = () => {
      if (this.data && this.data.stores) {
        this.$target.innerHTML = `
          <ul>
            ${this.data.stores
              .map(
                ({ addr, name }, i) =>
                  `
                  <li data-index="${i}">
                    <p>${name}</p>
                    <p>${addr}</p>
                  </li>
                  `
              )
              .join("")}
          </ul>
        `;
      }
    };
  
    this.render();
  }
  