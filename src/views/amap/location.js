let geolocation = null;
export function SelfLocation(params) { //{ map: "", current: ""}
  if (!geolocation) {
    // new一个新对象
    geolocation = new AMap.Geolocation({
      showCircle: false,
      showMarker: false,
      showButton: false, //显示定位的button
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：5s
      zoomToAccuracy: true   //定位成功后是否自动调整地图视野到定位点
    });
  }
  // 已经有实例对象了
  params.map.addControl(geolocation);
  geolocation.getCurrentPosition();
  if (params.complete && typeof params.complete == 'function') {
    AMap.event.addListener(geolocation, 'complete', params.complete); //定位成功
  }
  if (params.error && typeof params.error == 'function') {
    AMap.event.addListener(geolocation, 'error', params.error); //定位失败
  }
}