
let parametersbox=document.getElementById('parametersbox');
parametersbox.style.display="none";

let paramsradio=document.getElementById('paramsradio');
paramsradio.addEventListener('click',()=>{
    parametersbox.style.display="block";
    document.getElementById('requestjsonbox').style.display="none";;
    
})

let jsonradio=document.getElementById('jsonradio');
jsonradio.addEventListener('click',()=>{
    let requestjsonbox=document.getElementById('requestjsonbox');
    requestjsonbox.style.display="block";
    parametersbox.style.display="none";
})
let count=1;

let addparams=document.getElementById('addparams');
addparams.addEventListener('click',()=>{
    
    let string="";
    string=`<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label ">Parameter</label>
    <div class="col-md-4">
        <input type="text" class="form-control key" id="key${count+2}" placeholder="Enter Parameter Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control value" id="value${count+2}" placeholder="Enter Parameter Value">
    </div>

    <button class="btn btn-dark deleteparam"  onclick="return this.parentNode.remove();" >-</button>
    </div>`;
    
    let div=document.createElement("div");
    div.innerHTML=string;
    let params=document.getElementById('params');
    params.appendChild(div);
    
    count++;
})

let requesttype;
let contenttype;
let content_type_backup=document.getElementById('parametersbox');
        let content_id_backup=document.getElementById('contentid');
        let request_json_backup=document.getElementById('requestjsonbox');
let arrayofkey= document.getElementsByClassName('form-control key');
let arrayofvalue=document.getElementsByClassName('form-control value');


let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('responsejsontext').value="Please wait...Fetching Response...";
    let url=document.getElementById('url').value;
   
    if(document.getElementById('get').checked)
    requesttype="get";
    else
    requesttype="post";
    if(document.getElementById('jsonradio').checked)
    contenttype="json";
    else
    contenttype="parameter";

    
    let data;
    if(contenttype=='parameter')
   {
      data={};
    for(i=0;i<arrayofkey.length;i++)

    {   if((arrayofkey[i].value)=="" || (arrayofvalue[i].value)=="" )
        {
            let alert=document.getElementById('alert');
            alert.innerHTML=`<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Please write valid key or parameter value.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`

          setTimeout(()=>{
             alert.innerHTML="";
          },2000)
        }
        else
        data[arrayofkey[i].value]=arrayofvalue[i].value;
    }
    data=JSON.stringify(data);
    
   }
   else{
       data=document.getElementById('requestjsontext').value;
       
   }
    

   if(requesttype=="get")
   {
       
       fetch(url,{
           method: 'GET'})
       .then(response=>response.text())
       .then(text=>{document.getElementById('responsejsontext').value=text;});
   }
   else{
    
    fetch(url, {
        method:"POST", 
        body: data,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }  
    })
    .then(response=> response.text())
    .then((text) =>{
     document.getElementById('responsejsontext').value = text; });

    
   }


    
})





 





