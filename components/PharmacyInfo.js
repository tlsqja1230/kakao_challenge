export default class PharmacyInfo {
    $target = null;
    data = {
      visible: false,
      pharmacy: null,
    };
  
    constructor({ $target }) {
      this.$target = $target;
  
      this.render();
    }
  
    render() {
      if (this.data.visible) {
        this.$target.style.display = "block";
        this.$target.querySelector(
          ".pharmacy-info-contents"
        ).innerHTML = JSON.stringify(this.data.pharmacy);
      } else {
        this.$target.style.display = "none";
      }
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  }
  