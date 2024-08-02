var vm = new Vue({
  el: "#app",
  data: {
    books: [],
    cart: [],
    currentBook: null,
    isCartOpen: false,
    isManagementOpen: false,
    // totalPrice: 0
  },
  methods: {
    bgcss(url) {
      return {
        "background-image": "url(" + url + ")",
        "background-position": "center center",
        "background-size": "cover",
      };
    },
    wheel(evt) {
      TweenMax.to(".cards", 0.8, {
        left: "+=" + evt.deltaY * 5 + "px",
      });
    },
    addCart(book, evt) {
      this.currentBook = book;
      let target = evt.target;
      this.$nextTick(() => {
        TweenMax.from(".buybox", 0.8, {
          left: $(evt.target).offset().left,
          top: $(evt.target).offset().top,
          opacity: 1,
        });
        setTimeout(() => {
          let productNameList = this.cart.map((item) => item.name);
          if (productNameList.includes(book.name)) {
            alert(`商品已在購物車`);
            // this.currentBook.count += 1;
          } else {
            alert(`成功加入購物車`);
            Vue.set(this.currentBook, "count", 1);
            // this.currentBook.count = 1;
            this.cart.push(this.currentBook);
          }
        }, 800);
      });
    },
    deleteWholeCart() {
      Vue.set(this, "cart", []);
    },
    increaseItem(book, evt) {
      this.currentBook = book;
      if (this.currentBook.count < this.currentBook.stock) {
        Vue.set(this.currentBook, "count", this.currentBook.count + 1);
      }
    },
    decreaseItem(book, evt) {
      this.currentBook = book;
      if (this.currentBook.count > 1)
        Vue.set(this.currentBook, "count", this.currentBook.count - 1);
    },
    deleteItem(book, evt) {
      this.currentBook = book;
      this.cart = this.cart.filter(
        (item) => item.name != this.currentBook.name
      );

      // let name = this.currentBook.title
      // this.cart.indexOf(name)
    },
    cartController() {
      if (!this.isManagementOpen) {
        return (this.isCartOpen = !this.isCartOpen);
      }
    },
    managementController() {
      if (!this.isCartOpen) {
        return (this.isManagementOpen = !this.isManagementOpen);
      }
    },
    increaseStock(book, evt) {
      this.currentBook = book;
      Vue.set(this.currentBook, "stock", this.currentBook.stock + 1);
    },
    decreaseStock(book, evt) {
      this.currentBook = book;
      if (this.currentBook.stock > 1)
        Vue.set(this.currentBook, "stock", this.currentBook.stock - 1);
    },
    increaseTenStock(book, evt) {
      this.currentBook = book;
      Vue.set(this.currentBook, "stock", this.currentBook.stock + 10);
    },
    decreaseTenStock(book, evt) {
      this.currentBook = book;
      if (this.currentBook.stock > 10)
        Vue.set(this.currentBook, "stock", this.currentBook.stock - 10);
    },
  },
  computed: {
    totalPrice() {
      return this.cart
        .map((book) => book.price * book.count)
        .reduce((total, p) => total + p, 0);
    },
  },

  watch: {
    cart() {
      TweenMax.from(".fa-shopping-cart", 0.3, {
        scale: 0.5,
      });
    },
  },
  created() {
    console.log(`enter created`);
    let apiUrl = "./books.json";
    axios.get(apiUrl).then((res) => {
      this.books = res.data;
    });
  },
});
