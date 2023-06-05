var pophide = document.getElementById('pop_up_window');
var overlay = document.getElementById('whole-middle-container');
let LatestImage;


function editdel(index) {
    var x = document.getElementById("edidel-div-" + index);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function popdisplay() {
    pophide.style.display = 'flex';
    overlay.style.opacity = '0.2';
    document.body.style.backgroundColor = 'black';
    LatestImage = "";
}

function poplhide() {
    pophide.style.display = 'none';
    overlay.style.opacity = '1';
    document.body.style.backgroundColor = 'rgb(4, 19, 26)';
}

const reader = new FileReader();
document.getElementById('profile-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        LatestImage = reader.result;
    };
});

function submitted() {


    var fname = document.getElementById('fnamee').value;
    var lname = document.getElementById('lnamee').value;
    var phnum = document.getElementById('pnum').value;
    var adda = document.getElementById('addaras').value;

    if (fname.length == "" && lname.length == "" && phnum.length == ""  && adda.length == "") {
        alert("Please Fill all the fields.");
        return;
    }
    if (fname.length <= 2 && fname.length > 0) {
        alert("First Name Cannot Less than 2 characters.");
        return;
    }

    else if (fname.length == "") {
        alert("First Name Cannot be Empty.");
        return;
    }

    if (lname.length <= 2 && lname.length > 0) {
        alert("Last Name Cannot Less than 2 characters.");
        return;
    }
    else if (lname.length == "") {
        alert("Last Name Cannot be Empty.");
        return;
    }

    if (phnum.length != 10) {
        alert("Phone Number Must be of 10 Digits.");
        return;
    }
    else if (phnum.length == "") {
        alert("Phone Number Cannot be Empty.");
        return;
    }

    if (adda.length <= 2 && adda.length > 0) {
        alert("Address Cannot Less than 2 characters.");
        return;
    }
    else if (adda.length == "") {
        alert("Address Cannot be Empty.");
        return;
    }

    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }
    console.log(reader.result);


    let html = `<div class="card"><ul class="itul" id="myUL">`;

    html += '<li  class="for-pd"><img onclick="editdel(' + ContactList.length + ')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

    html += '<div class="edidel-div" id="edidel-div-' + ContactList.length + '"> <div class="div-del" onclick="onndelete()">DELETE</div> <div class="div-edit"  onclick="onnedit(' + ContactList.length + ')">EDIT</div></div>';

    html += '<li class="center-human"><img class="human" id="human"></li>';
    html += `<li class="for-pd for-mt">FirstName: ${fname}</li>`;
    html += `<li class="for-pd">LastName: ${lname}</li>`;
    html += `<li class="for-pd">Phone Number: ${phnum}</li>`;
    html += `<li class="for-pd">Address: ${adda}</li>`;

    html += `</ul><div>`;
    document.getElementById("all-card-parts").innerHTML += html;

    document.getElementById('fnamee').value = "";
    document.getElementById('lnamee').value = "";
    document.getElementById('pnum').value = "";
    document.getElementById('addaras').value = "";


    ContactList.push({
        firstname: fname, lastname: lname, Phonenumber: phnum,
        Address: adda, image: LatestImage
    });

    localStorage.setItem('ContactList', JSON.stringify(ContactList));

    poplhide();
    document.getElementById("contact-img-" + index).src = "";
    showdata();
}



function showdata() {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    document.getElementById("all-card-parts").innerHTML = "";
    for (let index = 0; index < ContactList.length; index++) {

        const element = ContactList[index];
        let html = `<div class="card"><ul class="itul" id="myUL">`;

        html += '<li class="for-pd"><img onclick="editdel(' + index + ')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

        html += '<li><div class="edidel-div" id="edidel-div-' + index + '"> <div class="div-del" onclick="onndelete(' + index + ')">DELETE</div> <div class="div-edit"  onclick="onnedit(' + index + ')">EDIT</div></div></li>';
        html += '<li class="center-human"><img class="human" id="contact-img-' + index + '" ></li>';
        html += `<li class="for-pd for-mt">FirstName: ${element.firstname}</li>`;
        html += `<li class="for-pd">LastName: ${element.lastname}</li>`;
        html += `<li class="for-pd">Phone Number: ${element.Phonenumber}</li>`;
        html += `<li class="for-pd">Address: ${element.Address}</li>`;

        html += `</ul><div>`;
        document.getElementById("all-card-parts").innerHTML += html;
        if (element.image == "") {
            document.getElementById("contact-img-" + index).src = './IMAGES/human.png';
        }
        else {
            document.getElementById("contact-img-" + index).src = element.image;
        }
    }
}


function onndelete(index) {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    ContactList.splice(index, 1);

    localStorage.setItem("ContactList", JSON.stringify(ContactList));
    showdata();
}

let updateindex;
function onnedit(index) {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    const element = ContactList[index];

    document.getElementById('fnamee').value = element.firstname;
    document.getElementById('lnamee').value = element.lastname;
    document.getElementById('pnum').value = element.Phonenumber;
    document.getElementById("contact-img-" + index).src = element.image;
    document.getElementById('addaras').value = element.Address;

    document.getElementById("Add-contact-btn").style.display = "none";
    document.getElementById("edit-contact-btn").style.display = "block";

    updateindex = index;
    popdisplay();
}

function update() {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    const element = ContactList[updateindex];

    element.firstname = document.getElementById('fnamee').value;
    element.lastname = document.getElementById('lnamee').value;
    element.Phonenumber = document.getElementById('pnum').value;
    element.Address = document.getElementById('addaras').value;

    if (element.firstname.length <= 2 && fname.length > 0) {
        alert("First Name Cannot Less than 2 characters...");
        return;
    }
    else if (element.firstname.length == "") {
        alert("First Name Cannot be Empty...");
        return;
    }

    if (element.lastname.length <= 2 && lname.length > 0) {
        alert("Last Name Cannot Less than 2 characters...");
        return;
    }
    else if (element.lastname.length == "") {
        alert("Last Name Cannot be Empty...");
        return;
    }

    if (element.Phonenumber.length != 10) {
        alert("Phone Number Must be of 10 Digits...");
        return;
    }
    else if (element.Phonenumber.length == "") {
        alert("Phone Number Cannot be Empty...");
        return;
    }

    if (element.Address.length <= 2 && element.Address.length > 0) {
        alert("Address Cannot Less than 2 characters...");
        return;
    }
    else if (element.Address.length == "") {
        alert("Address Cannot be Empty...");
        return;
    }

    if (element.image == "" && LatestImage == "") {
        element.image = "";
    }
    else if (LatestImage != "") {
        element.image = LatestImage;
    }

    localStorage.setItem("ContactList", JSON.stringify(ContactList));
    poplhide();
    showdata();
    document.getElementById("Add-contact-btn").style.display = "block";
    document.getElementById("edit-contact-btn").style.display = "none";
}


showdata();