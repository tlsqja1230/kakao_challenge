const MARKER_IMAGES = {
    HIGH:
      "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2020_kakao_challenge/marker-4-green.png",
    NORMAL:
      "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2020_kakao_challenge/marker-4-yellow.png",
    LOW:
      "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2020_kakao_challenge/marker-4-red.png",
    NONE:
      "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2020_kakao_challenge/marker-4-grey.png",
  };
  
  export default class BundangguMap {
    data = {
      center: {
        lat: 0,
        lng: 0,
      },
      markers: [],
      zoomLevel: 6,
    };
  
    map = null;
    $target = null;
    onClick = null;
  
    constructor({ $target, center, markers = [], zoomLevel = 4, onClick }) {
      this.$target = $target;
      this.data = {
        center,
        markers,
        zoomLevel,
      };
      this.onClick = onClick;
  
      this.render();
    }
  
    render() {
      const { markers, center } = this.data;
      const { lat, lng } = center;
      if (this.map) {
        this.map.setCenter(new kakao.maps.LatLng(lat, lng));
      } else {
        this.map = new kakao.maps.Map(this.$target, {
          center: new kakao.maps.LatLng(lat, lng),
          level: this.data.zoomLevel,
        });
      }
  
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        console.log(`map zoom level: ${this.map.getLevel()}`)
      });
  
      kakao.maps.event.addListener(this.map, "drag", () => {
        var bounds = this.map.getBounds();
        var sw = bounds.getSouthWest();
        var ne = bounds.getNorthEast();
        console.log(`south west: ${sw.getLat()},${sw.getLng()}\nnorth east: ${ne.getLat()},${ne.getLng()}`)
      });
  
      const markerImage = new kakao.maps.MarkerImage(
        "https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/competition-imgs/2020_kakao_challenge/marker-green.png",
        new kakao.maps.Size(24, 34)
      );
  
      markers.map((pharmacy) => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(pharmacy.lat, pharmacy.lng),
          clickable: true,
          image: markerImage
        });
  
        marker.setMap(this.map);
        kakao.maps.event.addListener(marker, "click", () => {
          this.onClick(pharmacy);
        });
      });
    }
  
    setState(nextData) {
      this.data = { ...this.data, ...nextData };
      this.render();
    }
  }
  