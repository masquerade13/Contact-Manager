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

    document.getElementById('fnamee').value = "";
    document.getElementById('lnamee').value = "";
    document.getElementById('pnum').value = "";
    document.getElementById('addaras').value = "";
    document.getElementById("profile-input").src = "";
    document.getElementById("profile-input").value = "";

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

var ids = 0;
function submitted() {
    var fname = document.getElementById('fnamee').value;
    var lname = document.getElementById('lnamee').value;
    var phnum = document.getElementById('pnum').value;
    var adda = document.getElementById('addaras').value;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    var flag = true;
    if (fname.length <= 2) {
        document.getElementById("div1").innerHTML = "Name cannot be less then 2 characters";
        flag = false;
    }
    else {
        document.getElementById("div1").innerHTML = "";
    }
    if (lname.length <= 2) {
        document.getElementById("divl").innerHTML = "Last Name cannot be less then 2 characters";
        flag = false;
    }
    else {
        document.getElementById("divl").innerHTML = "";
    }
    if (phnum.length != 10) {
        document.getElementById("contact-num").innerHTML = "Phone Number Must be of 10 Digits.";
        flag = false;
    }
    else {
        document.getElementById("contact-num").innerHTML = "";
    }
    if (adda.match(mailformat)) {
        document.getElementById("div2").innerHTML = "";
    }
    else {
        document.getElementById("div2").innerHTML = "Enter the correct email address";
        flag = false;
    }

    if (flag) {


        let ContactList;
        if (localStorage.getItem("ContactList") == null) {
            ContactList = [];
        } else {
            ContactList = JSON.parse(localStorage.getItem("ContactList"));
        }
        // console.log(reader.result);
        var html = '<div class="card" id="crd-' + ids + '"><ul class="itul" id="myUL">';

        html += '<li  class="for-pd"><img onclick="editdel(' + ContactList.length + ')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

        html += '<div class="edidel-div" id="edidel-div-' + ContactList.length + '"> <div class="div-del" onclick="onndelete()">DELETE</div> <div class="div-edit"  onclick="onnedit(' + ContactList.length + ')">EDIT</div></div>';

        html += '<li class="center-human"><img class="human" id="human"></li>';
        html += `<li class="for-pd for-mt">FirstName : ${fname}</li>`;
        html += `<li class="for-pd">LastName : ${lname}</li>`;
        html += `<li class="for-pd">Phone Number : ${phnum}</li>`;
        html += `<li class="for-pd">Email : ${adda}</li>`;

        html += `</ul><div>`;
        document.getElementById("all-card-parts").innerHTML += html;

        ContactList.push({
            firstname: fname, lastname: lname, Phonenumber: phnum,
            Address: adda, image: LatestImage
        });


        localStorage.setItem('ContactList', JSON.stringify(ContactList));

        poplhide();
        showdata();
    }
}



function showdata() {
    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    var ids = 0;
    document.getElementById("all-card-parts").innerHTML = "";
    for (let index = 0; index < ContactList.length; index++) {

        const element = ContactList[index];
        let html = '<div class="card" id="crd-' + ids + '"><ul class="itul" id="myUL">';
        ids = ids + 1;

        html += '<li class="for-pd"><img onclick="editdel(' + index + ')" class="three-dot" src="./IMAGES/three-dot.svg"></li>';

        html += '<li><div class="edidel-div" id="edidel-div-' + index + '"> <div class="div-del" onclick="onndelete(' + index + ')">DELETE</div> <div class="div-edit"  onclick="onnedit(' + index + ')">EDIT</div></div></li>';
        html += '<li class="center-human"><img class="human" id="contact-img-' + index + '" ></li>';
        html += `<li class="for-pd for-mt">FirstName: ${element.firstname}</li>`;
        html += `<li class="for-pd">LastName : ${element.lastname}</li>`;
        html += `<li class="for-pd">Phone Number : ${element.Phonenumber}</li>`;
        html += `<li class="for-pd">Email : ${element.Address}</li>`;

        html += `</ul><div>`;
        document.getElementById("all-card-parts").innerHTML += html;
        if (element.image == "") {
            document.getElementById("contact-img-" + index).src = './IMAGES/human.png';
        }
        else {
            document.getElementById("contact-img-" + index).src = element.image;
        }
    }
    document.getElementById("profile-input").src = "";
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
    document.getElementById("profile-input").src = element.image;
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
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    var fla = true;
    if (element.firstname.length <= 2) {
        document.getElementById("div1").innerHTML = "Name cannot be less then 2 characters";
        fla = false;
    }
    else {
        document.getElementById("div1").innerHTML = "";
    }
    if (element.lastname.length <= 2) {
        document.getElementById("divl").innerHTML = "Last Name cannot be less then 2 characters";
        fla = false;
    }
    else {
        document.getElementById("divl").innerHTML = "";
    }
    if (element.Phonenumber.length != 10) {
        document.getElementById("contact-num").innerHTML = "Phone Number Must be of 10 Digits.";
        fla = false;
    }
    else {
        document.getElementById("contact-num").innerHTML = "";
    }
    if (element.Address.match(mailformat)) {
        document.getElementById("div2").innerHTML = "";
    }
    else {
        document.getElementById("div2").innerHTML = "Enter the correct email address";
        fla = false;
    }

    if (fla) {
        localStorage.setItem("ContactList", JSON.stringify(ContactList));
        poplhide();
        showdata();
        document.getElementById("Add-contact-btn").style.display = "block";
        document.getElementById("edit-contact-btn").style.display = "none";
    }
}

function filterData() {
    var x = document.getElementById("myInput").value;

    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

    for (let index = 0; index < ContactList.length; index++) {
        const element = ContactList[index];
        var per_first_name = element.firstname.toLowerCase();
        var per_last_name = element.lastname.toLowerCase();
        var per_Ph_num = element.Phonenumber.toLowerCase();
        var per_Address = element.Address.toLowerCase();
        x = x.toLowerCase()
        if (x == "") {
            showdata();
        }

        else {
            if ((per_first_name.includes(x)) || (per_last_name.includes(x)) || (per_Ph_num.includes(x)) || (per_Address.includes(x))) {
                console.log(per_Address);
                document.getElementById('crd-' + index + '').style.display = "flex";
            }
            else {
                document.getElementById('crd-' + index + '').style.display = "none";
            }
        }
    }

}
showdata();