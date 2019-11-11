var goods_list = [];
var buy = [];

window.onload = function () {

   goods_list = [
    {
      name: "cardans",
      name_ukr: "Кардани",
      goods_list: [
        createGoods("./files/image/1.jpg", "Широкоугольний кардан 6 категорія", "32 645. 99 грн", "29 518. 32 грн", 0),
        createGoods("./files/image/3.jpg", "Широкоугольний кардан 2 категорія без кожуха", "9 400. 54 грн", "8 200. 00 грн", 0)
      ],
      activeted: "active",
      show: "show active"
    },
    {
      name: "gab",
      name_ukr: "Вилки",
      goods_list: [
        createGoods("./files/image/7.jpg", "Вилка в зборі", "4 500. 23 грн", "3 614. 33 грн", 0),
        createGoods("./files/image/4.jpg", "Bилка 6 категорія 8 шліцов", "923. 21 грн", "923. 21 грн", 0)
      ],
      activeted: "",
      show: ""
    }
  ];

  var vm = new Vue({
    el: '#goods',
    data: {
      goods_list: goods_list
    },
    methods: {

    }
  })
}

function createGoods(img, name, last_price, now_price, item_in_trash) {
  return {
    img: img,
    name: name,
    last_price: last_price,
    now_price: now_price,
    item_in_trash: item_in_trash
  }
}

function addToTrash(goods){
  console.log(goods);
  if(buy.includes(goods)){
    console.log("Has included");
  }else {
    console.log("Added");
    buy.push(goods);
  }
  goods.item_in_trash += 1;
  count_of_shop_items.recount();
  myModal.calculate();
}

var count_of_shop_items = new Vue({
  el: '#count_of_shop_items',
  data: {
    buy: buy,
    counter: 0
  },
  methods: {
    recount() {
      console.log(buy);
      var count = 0;
      for (var item in buy) {
        count += buy[item].item_in_trash;
      }
      this.counter = count;
    }
  }
})

var myModal = new Vue({
  el: '#myModal',
  data: {
    buy: buy,
    totalPrice: "0 грн"
  },
  methods: {
    calculate() {
      var count = 0.;
      for (var item in buy) {
        count += buy[item].item_in_trash * parseFloat(remove_linebreaks(buy[item].now_price));
      }
      this.totalPrice = formatNum(count.toFixed(2)) + " грн";
    },
    addOne(index) {
      console.log(buy[index]);
      buy[index].item_in_trash += 1;
      count_of_shop_items.recount();
      this.calculate();
    },
    minusOne(index) {
      if(buy[index].item_in_trash > 1){
        console.log(buy[index]);
        buy[index].item_in_trash -= 1;
        count_of_shop_items.recount();
        this.calculate();
      }else{
        if (index > -1){
          buy[index].item_in_trash = 0;
          buy.splice(index, 1);
          count_of_shop_items.recount();
          this.calculate();
        }
      }
    },
    clearAll() {
      buy=[];
      for (var index in buy) {
        buy[index].item_in_trash = 0;
      }
      for (var index in count_of_shop_items.buy) {
        count_of_shop_items.buy[index].item_in_trash = 0;
      }
      for (var index in count_of_shop_items.buy) {
        count_of_shop_items.buy[index].item_in_trash = 0;
      }
      count_of_shop_items.buy=buy;
      this.buy=buy;
      count_of_shop_items.recount();
    }
  }
})

function remove_linebreaks( str ) {
    return str.replace( /[ ]+/gm, "" );
}

function formatNum(number)
{
   var newNum = "";
   var oldNumStr = number + "";
   var done = 0;
   var parts = oldNumStr.split(".");
   var newPart1 = "";
   var newPart2 = parts[1];
   for(var j= parts[0].length -1 ;j >= 0;j--)
   {
       newNum = parts[0][j] + newNum;
       done++;
       if((done%3) == 0)
          newNum = " " + newNum;
   }
   newNum = (newPart2)? (newNum + ", " + newPart2) : newNum + ",00" ;
   return newNum;
}
