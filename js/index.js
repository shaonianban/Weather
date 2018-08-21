// var api = "";
// var lat, lon;
// var tempUnit = 'C';
// var currentTempInCelsius;

// $( document ).ready(function(){
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var lat = "lat=" + position.coords.latitude;
//       var lon = "lon=" + position.coords.longitude;
//       getWeather(lat, lon);
//     });
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }

//   $("#tempunit").click(function () {
//     var currentTempUnit = $("#tempunit").text();
//     var newTempUnit = currentTempUnit == "C" ? "F" : "C";
//     $("#tempunit").text(newTempUnit);
//     if (newTempUnit == "F") {
//       var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
//       $("#temp").text(fahTemp + " " + String.fromCharCode(176));
//     } else {
//       $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
//     }
//   });
  
// })

// function getWeather(lat, lon) {
//   var urlString = api + lat + "&" + lon;
//   $.ajax({
//     url: urlString, success: function (result) {
//       $("#city").text(result.name + ", ");
//       $("#country").text(result.sys.country);
//       currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
//       $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
//       $("#tempunit").text(tempUnit);
//       $("#desc").text(result.weather[0].main);
//       IconGen(result.weather[0].main);
//     }
//   });
// }



/*angular1.6版本以上url中不能包含callback这个参数，而是用jsonpCallbackParam来指定 因此这个获取json的方法只适用angular1.6 以下的*/
var app = angular.module('Weather', []);//创建模型
app.factory('WeatherApi', function($http) {//控制器 方法工厂 可以把方法写在这里面
  var obj = {};
  obj.getIP  = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  }
  //通过ip来获取天气状况
  obj.getCurrent = function(ip) {//拼接请求数据
    var api = "http://v.juhe.cn/weather/ip?format=1";
    //key要自己去聚合数据申请 每个人注册之后有免费的500次请求 
    //第一次1块钱可以买1000次请求之后可以花更多的钱买更多这里用xxxxx替代了，如果想要请自己申请--
    var APPKey = "&key=d7eb15d1623d6f02395b3ec5d0afc323&ip=";
    var cb = "&callback=JSON_CALLBACK";
    console.log(api + APPKey + ip + cb);
    return $http.jsonp(api + APPKey + ip + cb);//发送跨站请求

  };
  console.log(obj);
  return obj
});

app.controller('MainCtrl', function($scope, WeatherApi) {
  $scope.Data = {};
  WeatherApi.getIP().success(function(data){
    var ip = data.ip;
    WeatherApi.getCurrent(ip).success(function(data) {
      $scope.Data = data.result;//获取get的结果
      console.log(data.result);
      //这里可以把未来几天的天气也列出来--需要加lists
      // $scope.items= data.result.future;//把未来几天的天天气对象数组存入
      // delete $scope.items[Object.keys($scope.items)[0]];
    });
  })
});

// function IconGen(desc) {
//   var desc = desc.toLowerCase()
//   switch (desc) {
//     case 'drizzle':
//       addIcon(desc)
//       break;
//     case 'clouds':
//       addIcon(desc)
//       break;
//     case 'rain':
//       addIcon(desc)
//       break;
//     case 'snow':
//       addIcon(desc)
//       break;
//     case 'clear':
//       addIcon(desc)
//       break;
//     case 'thunderstom':
//       addIcon(desc)
//       break;
//     default:
//       $('div.clouds').removeClass('hide');
//   }
// }

// function addIcon(desc) {
//   $('div.' + desc).removeClass('hide');
// }