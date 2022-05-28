


let phoneCart =[];
let phoneList = [];
 async function fetchPhone() {
  try {
   
    const result = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });
 phoneList = result.data
 console.log(phoneList)

    renderPhone(phoneList)
    
  return phoneList
  } catch (error) {
    console.log(error);
  }
  
};

fetchPhone()




const renderPhone = (data)=>{
let resultHtml ='';
 data.forEach((item, index) => {
    resultHtml += `
    <div class="col-3 mt-3">   
      <div class="card ">
<img src="${item.img}" data-toggle="modal" data-target="#exampleModalLong"  onclick="renderChiTiet(${item.id})" class="card-img-top" style="height:192px"" alt="...">
<div class="card-body ">
  <h5 class="card-title" style=height:48px;>${item.name}</h5>
  <p class="card-text" style="
  height:83px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;">${item.desc}</p>
  <a href="#"  class="btn btn-success d-block cart-button" onclick="addPhone('${item.id}')">Card</a>
</div>
</div>
</div>
      `;
  });
document.getElementById("products").innerHTML = resultHtml
}
const filter = async function(){
    const value = document.getElementById("filter").value
    const result = await axios({
        url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
        method: "GET",
      });
    const resultFilter = result.data.filter((item,index)=>{
        return item.type.toLowerCase() === value.toLowerCase();
    })
    if(value==="All"){
        
        renderPhone(result.data)}else{

            renderPhone(resultFilter)
        }
}
const saveData =()=>{
  const phoneDataJSON = JSON.stringify(phoneCart)
  localStorage.setItem("phoneData",phoneDataJSON)
}
function mapData(dataFromLocal){
  let data =[];
  for(var i=0;i<dataFromLocal.length;i++){
    let currentPhone = dataFromLocal[i];
    let mapPhone = new Product(
     currentPhone.name ,
       currentPhone.price,
       currentPhone.screen ,
       currentPhone.backCamera ,
       currentPhone.frontCamera ,
       currentPhone.img ,
       currentPhone.desc ,
       currentPhone.type,
       currentPhone.id ,
       1
       
      

    )
    data.push(mapPhone)
  }
  return data;
}
var getData = function () {
  var phoneJSON = localStorage.getItem("phoneData");
  if (phoneJSON) {
    phoneCart = mapData(JSON.parse(phoneJSON));
    renderPhoneCart(phoneCart);
  }
};
getData()

const addPhone = (id)=>{
const value=phoneList.findIndex((item,index)=>{
  return item.id === id;
})

 var returnPhone = new Product(
   
   phoneList[value].name ,
   phoneList[value].price,
   phoneList[value].screen ,
   phoneList[value].backCamera ,
   phoneList[value].frontCamera ,
   phoneList[value].img ,
   phoneList[value].desc ,
   phoneList[value].type,
   phoneList[value].id ,
   1
 )


 
const result = phoneCart.findIndex((item,index)=>{
  return item.id=== returnPhone.id
})
if(result===-1){
  phoneCart.push(returnPhone)
 
}else{
  phoneCart[result].quantity+=1;
}
renderPhoneCart(phoneCart)
saveData()


}
const deletePhone = (id)=>{
  const value = phoneCart.findIndex((item,index)=>{
    return item.id === id ;
  })
  phoneCart.splice(value,1)
  renderPhoneCart(phoneCart)
saveData()
}
function tangGiamSoLuong(status,id){
  const value = phoneCart.findIndex((item,index)=>{
    return item.id == id
  })
  if(status){
   phoneCart[value].quantity +=1;
  }else{
    phoneCart[value].quantity -=1;
    if(phoneCart[value].quantity ===0){
      deletePhone(id)
      renderPhoneCart(phoneCart)
      saveData()
    }
  }
  renderPhoneCart(phoneCart);
  saveData()

}
function renderPhoneCart(data){
  let dataHtml="";
  data.forEach((item,index)=>{
    dataHtml +=`
    <tr>
    <td><img src="${item.img}"  style='height:75px'/></td>
    <td>${item.name}</td>
    <td>${item.price.toLocaleString()}</td>
    <td><button class="btn btn-danger" onclick="tangGiamSoLuong(false,${item.id})">-</button>${item.quantity}<button onclick="tangGiamSoLuong(true,${item.id})" class="btn btn-danger">+</button></td>
    <td>${item.tinhTien().toLocaleString()}</td>
    <td><button onclick="deletePhone('${item.id}')" class="btn btn-danger">X</button></td>
    </tr>
    `
  })
  tinhTongTien()

  document.getElementById("cart").innerHTML=dataHtml
}
function tinhTongTien(){
 let total = phoneCart.reduce((tongTien,item)=>{
   return tongTien+= item.tinhTien()
 },0)
 document.getElementById("pay").innerHTML=total.toLocaleString()
 
}
const renderChiTiet = async function (id){
  try{
    const result =await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    })
    const value = result.data.findIndex((item,index)=>{
      return item.id == id
    })
    const findResult = result.data[value]
   
    if(value){
      console.log(value)
      let dataHtml ='';
      dataHtml+= `
      <div class="col-4"><img src='${findResult.img}' alt="" style="width:100%"/></div>
      <div class="col-8">
     <table class="table">
     <tr>
     <th>Name</th>
     <td>${findResult.name}</td>
     
     </tr>
     <tr>
     <th>Price</th>
     <td>${findResult.price}</td>
     
     </tr>
     <tr>
     <th>Screen</th>
     <td>${findResult.screen}</td>
     
     </tr>
     <tr>
     <th>Back Camera</th>
     <td>${findResult.backCamera}</td>
     
     </tr>
     <tr>
     <th>Front Camera</th>
     <td>${findResult.frontCamera}</td>
     
     </tr>
     <tr>
     <th>Desc</th>
     <td>${findResult.desc}</td>
     
     </tr>
     </table>
      
      </div>
      `
    
      
      document.getElementById("renderChiTiet").innerHTML = dataHtml;
    }
    
    
  }catch(err){
    console.log(err)
  }
}

function reset(){
  phoneCart = [];
  renderPhoneCart(phoneCart);
  saveData()
}



document.getElementById("filter").addEventListener("change", filter)




