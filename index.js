var pophide = document.getElementById('pop_up_window');

var overlay = document.getElementById('whole-middle-container');



function editdel() {
    var x = document.getElementById("edidel-div");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

function popdisplay() {
    pophide.style.display = 'flex';
    overlay.style.opacity = '0.2';
    document.body.style.backgroundColor = '#ff5f5fe3';
}

function poplhide() {
    pophide.style.display = 'none';
    overlay.style.opacity = '1';
    document.body.style.backgroundColor = '#ff5f5f';
}


function submitted() {
    var fname = document.getElementById('fnamee').value;
    var lname = document.getElementById('lnamee').value;
    var phnum = document.getElementById('pnum').value;
    var adda = document.getElementById('addaras').value;
    
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    let html = `<div class="card"><ul class="itul">`;

    html += '<li><img onclick="editdel('+ContactList.length+')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

    html += '<div class="edidel-div" id="edidel-div"> <div class="div-del" onclick="onndelete()">DELETE</div> <div class="div-edit"  onclick="onnedit()">EDIT</div></div>';

    html += '<li><img class="human" src="./IMAGES/human.png"></li>';
    html += `<li>FirstName: ${fname}</li>`;
    html += `<li>LastName: ${lname}</li>`;
    html += `<li>Phone Number: ${phnum}</li>`;
    html += `<li>Address: ${adda}</li>`;

    html += `</ul><div>`;
    document.getElementById("all-card-parts").innerHTML += html;

    document.getElementById('fnamee').value = "";
    document.getElementById('lnamee').value = "";
    document.getElementById('pnum').value = "";
    document.getElementById('addaras').value = "";


    ContactList.push({
        firstname: fname, lastname: lname, Phonenumber: phnum,
        Address: adda
    });

    localStorage.setItem('ContactList', JSON.stringify(ContactList));

    poplhide();


}


function showdata() {   
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    let html;
    for (let index = 0; index < ContactList.length; index++) {

        const element = ContactList[index];
        console.log(element.firstname + " Inputted");
        html = `<div class="card"><ul class="itul">`;

        html += '<li><img onclick="editdel('+index+')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

        html += '<li><div class="edidel-div" id="edidel-div"> <div class="div-del" onclick="onndelete('+index+')">DELETE</div> <div class="div-edit"  onclick="onnedit()">EDIT</div></div></li>';

        html += '<li><img class="human" src="./IMAGES/human.png"></li>';
        html += `<li>FirstName: ${element.firstname}</li>`;
        html += `<li>LastName: ${element.lastname}</li>`;
        html += `<li>Phone Number: ${element.Phonenumber}</li>`;
        html += `<li>Address: ${element.Address}</li>`;

        html += `</ul><div>`;
    }
    document.getElementById("all-card-parts").innerHTML = html;
}


function onndelete(index) {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    
    ContactList.splice(index,1);

    localStorage.setItem("ContactList", JSON.stringify(ContactList));
    showdata();
}




















showdata();


