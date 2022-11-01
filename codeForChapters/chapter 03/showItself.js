function ShowItself1(identity) {
  this.identity = identity;
  setTimeout(function () {
    console.log(this.identity);
  }, 1000);
}

const x1 = ShowItself1("Functional");

function ShowItself2(identity) {
  this.identity = identity;
  const that = this;
  setTimeout(function () {
    console.log(that.identity);
  }, 1000);

  setTimeout(
    function () {
      console.log(this.identity);
    }.bind(this),
    2000
  );

  setTimeout(() => {
    console.log(this.identity);
  }, 3000);
}

const x2 = new ShowItself2("JavaScript");
// after one second, "JavaScript"
// after another second, the same
// after yet another second, once again
