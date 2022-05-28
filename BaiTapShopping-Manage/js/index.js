

let phoneList =[];
const createProduct =()=>{
  if(!validate()) return;
  let id=  document.getElementById("txtMaSP").value;
  let name = document.getElementById("txtTenSP").value;
  let price = document.getElementById("txtPrice").value;
  let screen = document.getElementById("txtScreen").value;
  let type = document.getElementById("txtType").value;
  let frontCamera = document.getElementById("txtfrontCam").value;
  let backCamera = document.getElementById("txtbackCam").value;
  let quantity = document.getElementById("txtQuantity").value;
  let desc = document.getElementById("txtDesc").value;
  let img = document.getElementById("txtImg").value;

  var newProduct = new Product(name,price,screen,backCamera,frontCamera,img,desc,type,id,quantity);
  axios({
    url:"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method:"POST",
    data:newProduct
  }).then((res)=>{
    getData()
    document.getElementById("btnReset").click()
  }).catch((err)=>{
    console.error(err);
  })
  
}
async function getData (){
  try{
    const result = await axios({
      url :"https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method : "GET",
  
    })
     phoneList = mapData(result.data);
    renderPhone(phoneList)
  
  }catch(err){
    console.log(err)
  }
  
}
getData()

const renderPhone =(data=phoneList)=>{
var dataHtml = "";
for (var i=0; i<data.length; i++){
  dataHtml += `
  <tr>
  <td>${i+1}</td>
  <td>${data[i].id}</td>

  <td><img src="${data[i].img}" style="height:75px"/></td>
  <td>${data[i].name}</td>


  

  <td>${data[i].price}</td>
  <td>${data[i].type}</td>
  <td>${data[i].quantity}</td>
  <td><button class="btn btn-danger" onclick="deletePhone('${data[i].id}')">Xoa</button>
  <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick="showDetail('${data[i].id}')" >Chi tiet</button>
  </td>
  </tr>
  `
  document.getElementById("tbodyProduct").innerHTML = dataHtml
}
}
const mapData = (dataFromLocal)=>{
  let data =[];
  for(var i=0; i<dataFromLocal.length; i++){
    let currentPhone = dataFromLocal[i];
    let mapPhone = new Product(currentPhone.name,currentPhone.price,currentPhone.screen,currentPhone.backCamera,currentPhone.frontCamera,currentPhone.img,currentPhone.desc,currentPhone.type,currentPhone.id,currentPhone.quantity)
    data.push(mapPhone)
  }
  return data;

}
const findId = (id)=>{
  for (var i = 0; i < phoneList.length; i++) {
    if (phoneList[i].id === id) {
      return i;
    }
  }
  return -1;
}
const deletePhone = (id)=>{
  axios({
    url :`https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method : 'DELETE'
  }).then((res)=>{
    getData()
  }).catch((err)=>{
    console.error(err)
  })
}
const findProduct = ()=>{
  
  var keyWord = document.getElementById("txtSearch").value.toLowerCase().trim()
  console.log(keyWord)
  let results = []
  for(var i = 0; i < phoneList.length; i++) {
    var phoneName = phoneList[i].name.toLowerCase()
    if(phoneName.includes(keyWord)||phoneList[i].id.includes(keyWord)|| phoneList[i].type.toLowerCase().includes(keyWord)){
      results.push(phoneList[i])
     
    }
  }
  renderPhone(results)
}

async function showDetail(id){
 const result = await axios({
   url:`https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
   method : "GET"
 })
 const item = result.data
 let resultHtml = `
 <div class="row">
 <div class="col-sm-4">
 <img width="100%" src='${item.img}'/>
 </div>
 <div class="col-sm-8">
 <table class="table">
 <tbody>
 <tr>
 <th>
 Ten san pham :
 </th>
 <td>${item.name}</td>
 </tr>
 <tr>
 <th>
 Gia ban :
 </th>
 <td>${item.price}</td>
 </tr>
 <tr>
 <th>
 Man hinh :
 </th>
 <td>${item.screen}</td>
 </tr>
 <tr>
 <th>
 Camera sau :
 </th>
 <td>${item.backCamera}</td>
 </tr>
 <tr>
 <th>
 Camera truoc :
 </th>
 <td>${item.frontCamera}</td>
 </tr>
 <tr>
 <th>
 Mo ta :
 </th>
 <td>${item.desc}</td>
 </tr>
 <tr>
 <th>
 Hang san xuat :
 </th>
 <td>${item.type}</td>
 </tr>
 <tr>
 <th>
 Ma san pham :
 </th>
 <td>${item.id}</td>
 </tr>
 <tr>
 <th>
 So luong :
 </th>
 <td>${item.quantity}</td>
 </tr>
 
 </tbody>
 </table>
 </div>
 </div>
 `
 document.getElementById("productDetails").innerHTML = resultHtml

getProduct(item)

}
const getProduct = (item)=>{
document.getElementById("btnUpdateModal").onclick = ()=> {
  document.getElementById("txtMaSP").value = item.id
   document.getElementById("txtTenSP").value = item.name
   document.getElementById("txtPrice").value = item.price
  document.getElementById("txtScreen").value = item.screen
 document.getElementById("txtType").value = item.type
   document.getElementById("txtfrontCam").value = item.frontCamera
  document.getElementById("txtbackCam").value = item.backCamera
  document.getElementById("txtQuantity").value = item.quantity
  document.getElementById("txtDesc").value = item.desc
 document.getElementById("txtImg").value = item.img

 document.getElementById("btnCreate").style.display = "none";
 document.getElementById("btnUpdate").style.display = "block";

 document.getElementById("txtMaSP").disabled = true;

}
}
const updateProduct = ()=>{
  let id=  document.getElementById("txtMaSP").value;
  let name = document.getElementById("txtTenSP").value;
  let price = document.getElementById("txtPrice").value;
  let screen = document.getElementById("txtScreen").value;
  let type = document.getElementById("txtType").value;
  let frontCamera = document.getElementById("txtfrontCam").value;
  let backCamera = document.getElementById("txtbackCam").value;
  let quantity = document.getElementById("txtQuantity").value;
  let desc = document.getElementById("txtDesc").value;
  let img = document.getElementById("txtImg").value;
  var updateProduct = new Product(name,price,screen,backCamera,frontCamera,img,desc,type,id,quantity)
  axios({
    url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
    method: "PUT",
    data: updateProduct,
  })
    .then(function (res) {
      getData();
      document.getElementById("btnReset").click();
      document.getElementById("btnCreate").style.display = "block";
 document.getElementById("btnUpdate").style.display = "none";
      document.getElementById("txtMaSP").disabled = false;
    })
    .catch(function (err) {
      console.log(err);
    });
}
function required(value,spanId,message){
    
  if(!value){
      document.getElementById(spanId).style.display ="block"
      document.getElementById(spanId).innerHTML = message || "This field is required"
      return false
  }
  document.getElementById(spanId).innerHTML = ""
  return true;
}
function pattern(value,spanId,regex,message){
  if(!regex.test(value)){
      document.getElementById(spanId).style.display ="block"

     document.getElementById(spanId).innerHTML = message ||"Incorrect value"
     return false
  }
  document.getElementById(spanId).innerHTML =""
  return true;
 }
 function validate(){
  let id=  document.getElementById("txtMaSP").value;
  let name = document.getElementById("txtTenSP").value;
  let price = document.getElementById("txtPrice").value;
  let screen = document.getElementById("txtScreen").value;
  let type = document.getElementById("txtType").value;
  let frontCamera = document.getElementById("txtfrontCam").value;
  let backCamera = document.getElementById("txtbackCam").value;
  let quantity = document.getElementById("txtQuantity").value;
  let desc = document.getElementById("txtDesc").value;
  let img = document.getElementById("txtImg").value;

  var isValid = true;
  var regexId = /^[0-9]+$/g
  var regexName =/^[a-zA-Z0-9_.-]*$/g
  // var regexPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/g
  // var regexEmail =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
  // var regexDate =/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g
  var regexPrice =/^[1-9][0-9]*$/g
  // var regexWork =/^[1-9][0-9]*$/g
  isValid&=required(id,"spanMaSP") && pattern(id,"spanMaSP",regexId,"The id only includes numbers ")
  
  isValid&=required(name,"spanTenSP") 
  isValid&=required(price,"spanPrice") &&  pattern(price,"spanPrice",regexPrice,"This price is not permitted")
  isValid&=required(screen,"spanScreen")
  isValid&=required(type,"spanType") 
  isValid&=required(frontCamera,"spanfrontCam") 
  isValid&=required(backCamera,"spanbackCam") 
  isValid&=required(quantity,"spanQuantity") 
  isValid&=required(desc,"spanDesc") 
  isValid&=required(img,"spanImg") 

  
  return isValid
}

