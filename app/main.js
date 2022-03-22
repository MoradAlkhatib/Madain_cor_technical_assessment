const list = document.getElementById("list");
const category_filter = document.getElementById("category_filters");

 let data_api;
 const getData = fetch('http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&category=[%22category1%22,%22category2%22,%22category3%22]&pretty=true')
	.then(response => response.json()
     
    )
	.then(data => {
        console.log(data)
        data_api = data
        data.forEach(item=>{
            let card = new Card(item.fname, item.lname, item.category);
            card.render();
        })
    })
   
	.catch(err => console.error(err));
  

class Card {
  constructor(f_name, l_name, category) {
    this.f_name = f_name;
    this.l_name = l_name;
    this.category = category;
  }
  render() {
      // function that render the cards with api that coming from API
    let card = document.createElement("div");
    list.appendChild(card);
    card.className = "card";

    // render  all data 
   
    let initials = document.createElement("p");
    initials.classList.add("initials");
    initials.textContent = this.f_name.charAt(0) + this.l_name.charAt(0);
    card.appendChild(initials);

    // name section

    let name = document.createElement("h3");
    name.textContent = `${this.f_name} ${this.l_name}`;
    card.appendChild(name);

    // category section

    let category = document.createElement("button");
    category.classList.add("category");
    category.textContent = this.category;
    card.appendChild(category);
  }
}

category_filter.addEventListener("click", (e) => filterData(e));

filterData = (e) => {
    // function that make filter for data by category
  list.innerHTML = "";
  api_data=  data_api.filter(item=> item.category==e.target.textContent)
    api_data.forEach(item=>{
        let card=new Card(item.fname,item.lname,item.category);
        card.render() 
       })

};