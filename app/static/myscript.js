Vue.component('chart', {
  'props': ['charttype', 'percent'],
  'template': '<div style="width: 128px; height: 128px;"><canvas></canvas></div>',
  'data': function() {
    return {'value': 30,
            'ctx': null,
            'chartobj': null}
  },

  // //Watch komutu izleme value degerini izleme yapar.
  // //Valude herangibir değişliklik olduğunda degerleri yeniler
  // 'watch': {
  //   'value': function() {
  //     console.log('ahoy!');
  //     this.chartobj.data.datasets[0].data[0] = this.value;
  //     this.chartobj.data.datasets[0].data[1] = 4095 - this.value;
  //     this.chartobj.update();
  //   }
  // },

  'mounted': function(){
    //this.$el dısardaki divi gösteriyor.children ile icerdeki chart'a ulastik
    this.ctx = this.$el.children[0].getContext('2d');
    this.chartobj = new Chart(this.ctx, {
      'type': this.charttype,
      'data': {
        'datasets': [{
          'data': [this.value, 4095-this.value],
          'backgroundColor': [
            'purple',
            'orange'
          ]
        }]
      },
      'options': {
        'tooltips':{
          'enabled': false
        }
      }
    });
  }
});


var app = new Vue({
  'el': '#app',
  'data': {
    barValue: 25,
    interval: null
  },

  'created': function() {
    this.interval = setInterval(this.loadDoc, 500);
  },

  'methods': {
  'loadDoc': function(){
    var xhttp = new XMLHttpRequest();
    //Sekron olarak islemlerin gerceklenmesi icin biri bitmeden diğeri olmayan birşey üzerinden
    //istek yapmaya calisiyor olabilir.Bu engellenmesi icin.
    application = this;
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        var obj = JSON.parse(this.responseText);
        //diğer componentse erisim icin $ref kullanıldı.
        application.$refs.grafik.chartobj.data.datasets[0].data[0] = obj.value;
        application.$refs.grafik.chartobj.data.datasets[0].data[1] = 4095 - obj.value;
        application.$refs.grafik.chartobj.update();
      }
    };
    xhttp.open("GET","http://172.22.9.13/api/ao/1/read", true);
    xhttp.send();
  }
}
});


// function loadDoc(){
//   var xhttp = new XMLHttpRequest();
//   //Sekron olarak islem tamamlanmadan xhttp istegi daha tamamlanmayıp
//   //daha oluşturulmuş olabilir.Sekron çalışılması içi gereklidir.
//   xhttp.onreadystatechange = function(){
//     if (this.readyState == 4 && this.status == 200){
//       text = this.responseText;
//       document.getElementById("demo").innerHTML = text;

//     }
//   };
//   xhttp.open("GET","http://172.22.9.13/api/ao/1/read", true);
//   xhttp.send();
//   console.log("Status:OK");
// }