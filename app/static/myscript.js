Vue.component('chart', {
  'props': ['charttype', 'percent'],
  'template': '<div style="width: 128px; height: 128px;"><canvas></canvas></div>',
  'data': function() {
    return {'value': 30,
            'ctx': null,
            'chartobj': null}
  },

  //Watch "value" degerini izler, "Value"de herangibir değişliklik olduğunda degerleri yeniler
  'watch': {
    'value': function() {
      this.chartobj.data.datasets[0].data[0] = this.value;
      this.chartobj.data.datasets[0].data[1] = 4095 - this.value;
      this.chartobj.update();
    }
  },

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

  //500 milisaniyede bir fonksiyonun yenilenmesi saglanir.
  'created': function() {
    this.interval = setInterval(this.loadDoc, 500);
  },

  'methods': {
  'loadDoc': function(){
    var xhttp = new XMLHttpRequest();
    application = this;
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        var obj = JSON.parse(this.responseText);
        //diğer componentse erisim icin $ref kullanıldı.
        //value degeri güncellendi
        application.$refs.grafik.value = obj.value;
      }
    };
    xhttp.open("GET","http://172.22.9.13/api/ao/1/read", true);
    xhttp.send();
  }
}
});
