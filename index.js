var pophide = document.getElementById('pop_up_window');


function popdisplay() {
    pophide.style.display = 'flex';
}

function poplhide() {
    pophide.style.display = 'none';
}

function editdel() {

}



function submitted() {
    var fname = document.getElementById('fnamee').value;
    var lname = document.getElementById('lnamee').value;
    var phnum = document.getElementById('pnum').value;
    var adda = document.getElementById('addaras').value;

    let html = `<div class="card"><ul class="itul">`;

    html += '<img onclick="editdel()" class="three-dot" src="./IMAGES/three-dot.svg">';
    html += '<img class="human" src="./IMAGES/human.png">';
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

    let ContactList;
    if (localStorage.getItem("ContactList") == null) {
        ContactList = [];
    } else {
        ContactList = JSON.parse(localStorage.getItem("ContactList"));
    }

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

    for (let index = 0; index < ContactList.length; index++) {
        const element = ContactList[index];
        console.log(element.firstname);
        let html = `<div class="card"><ul class="itul">`;

        html += '<img onclick="editdel()" class="three-dot" src="./IMAGES/three-dot.svg">';
        html += '<img class="human" src="./IMAGES/human.png">';
        html += `<li>FirstName: ${element.firstname}</li>`;
        html += `<li>LastName: ${element.lastname}</li>`;
        html += `<li>Phone Number: ${element.Phonenumber}</li>`;
        html += `<li>Address: ${element.Address}</li>`;

        html += `</ul><div>`;
        document.getElementById("all-card-parts").innerHTML += html;
    }
}




















showdata();


