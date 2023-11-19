function deleteHouseByIndex(index) {
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");

  houses.splice(index, 1);

  localStorage.setItem("houses", JSON.stringify(houses));

  location.reload();
}

function displayAllHouses() {
  var content = ``;
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");

  for (let i = 0; i < houses.length; i++) {
    content =
      content +
      `
      <tr> <td><h5>${houses[i].name}</h5></td>
     <td><img src="${houses[i].imageUrl}" style="width:150px"></img></td>

     <td><h5>${houses[i].adress}</h5></td>
     <td><h5>${houses[i].description}</h5></td>
     <td><h5>${houses[i].town}</h5></td>

     <td><h5>${searchTotalRoomsByIdHouse(houses[i].id)}</h5></td>
     <td class="d-flex"><button class="btn btn-warning " onclick="deleteHouseByIndex(${i})">Delete</button><button class="btn btn-warning ml-2 mr-2" onclick="updateHouseByID(${
        houses[i].id
      })">Update</button>

    </td>
 
       </tr>`;
  }

  document.getElementById("my_tr_house").innerHTML = content;
}

function displayAllRooms() {
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  var content = ``;

  for (let j = 0; j < rooms.length; j++) {
    var house = getObjectFromBaseById("houses", rooms[j].houseId);

    content =
      content +
      `
          <tr> <td><h5>${house.name}</h5></td>
    <td><h5>${rooms[j].name}</h5></td>
    <td><h5>${rooms[j].description}</h5></td>

   <td><h5>${rooms[j].price}</h5></td>
   <td><h5>${rooms[j].capacity}</h5></td>



   <td><button class="btn btn-warning "   onclick="deleteRoomByID(${rooms[j].id})">Delete</button>
   <button class="btn btn-warning ml-2 " onclick="updateRoomByID(${rooms[j].id})">Update</button>
   </td>


     </tr>`;
  }

  document.getElementById("my_tr_rooms").innerHTML = content;
}

function displayAllReservations() {
  var connectedUser = localStorage.getItem("connectedUserId");
  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  var ownerHouses = getTableById("houses", connectedUser, "owner_id");
  var roomsOwner = [];
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < ownerHouses.length; j++) {
      if (rooms[i].houseId == ownerHouses[j].id) {
        roomsOwner.push(rooms[i].id);
      }
    }
  }
  var content = ``;
  for (let i = 0; i < reservations.length; i++) {
    var room = getObjectFromBaseById("rooms", reservations[i].idRoom);
    var house = getObjectFromBaseById("houses", room.houseId);
    var user = getObjectFromBaseById("users", reservations[i].idClient);

    var s1 = new Date(reservations[i].dateIn);
    var e1 = new Date(reservations[i].dateOut);
    content =
      content +
      `
<tr> <td><h5>${house.name}</h5></td>
<td><h5>${room.name}</h5></td>
<td><h5>${user.firstName}</h5></td>
<td><h5>${reservations[i].numberGuests}</h5></td>
<td><h5>${room.price}</h5></td>
<td><h5>${s1.getDate()}-${s1.getMonth() + 1}-${s1.getFullYear()}</h5></td>
<td><h5>${e1.getDate()}-${e1.getMonth() + 1}-${e1.getFullYear()}</h5></td>
<td><button class="btn btn-warning "   onclick="cancelReservationByID(${
        reservations[i].id
      })">Cancel reservation</button>
</td></tr>`;
  }

  document.getElementById("my_tr_reservations").innerHTML = content;
}

function updateProfileSelected() {
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  var adresse = document.getElementById("adress").value;
  var telephone = document.getElementById("telephone").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var test = true;

  if (!verifyLength(firstName, 4)) {
    document.getElementById("nameError").innerHTML =
      "Please verify your first name";
    document.getElementById("nameError").style.color = "red";
    test = false;
  } else document.getElementById("nameError").innerHTML = "";

  if (!verifyLength(lastName, 4)) {
    document.getElementById("lastNameError").innerHTML =
      "Please verify your last name";
    document.getElementById("lastNameError").style.color = "red";
    test = false;
  } else document.getElementById("lastNameError").innerHTML = "";

  if (!verifyLength(adresse, 4)) {
    document.getElementById("adressError").innerHTML =
      "Please verify your adress";
    document.getElementById("adressError").style.color = "red";
    test = false;
  } else document.getElementById("adressError").innerHTML = "";

  if (!verifyLength(email, 4)) {
    document.getElementById("emailError").innerHTML =
      "Please verify your email adress";
    document.getElementById("emailError").style.color = "red";
    test = false;
  } else document.getElementById("emailError").innerHTML = "";

  if (!verifyTel(telephone.toString())) {
    document.getElementById("telephoneError").innerHTML =
      "Please verify your phone number";
    document.getElementById("telephoneError").style.color = "red";
    test = false;
  } else document.getElementById("telephoneError").innerHTML = "";

  if (!verifyLength(password, 3)) {
    document.getElementById("passwordError").innerHTML =
      "Pass must contain at least 4 chars";
    document.getElementById("passwordError").style.color = "red";
    test = false;
    return;
  } else document.getElementById("passwordError").innerHTML = "";

  if (!test) {
    return;
  } else {
    var selected = localStorage.getItem("selectedUserToUpdateByIndex");
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    users[selected].firstName = firstName;
    users[selected].lastName = lastName;
    users[selected].email = email;
    users[selected].telephone = telephone;
    users[selected].adresse = adresse;
    users[selected].password = password;
  }
  localStorage.setItem("users", JSON.stringify(users));
  alert("Your profile has been updated succesfully!");
  location.reload();
}

function populateProfileSelected() {
  var selected = localStorage.getItem("selectedUserToUpdateByIndex");
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  document.getElementById("first_name").value = users[selected].firstName;
  document.getElementById("last_name").value = users[selected].lastName;
  document.getElementById("email").value = users[selected].email;
  document.getElementById("adress").value = users[selected].adresse;
  document.getElementById("telephone").value = users[selected].telephone;
  document.getElementById("password").value = users[selected].password;
}

function deleteUserByIndex(index) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function updateUserIndex(index) {
  localStorage.setItem("selectedUserToUpdateByIndex", index);
  location.replace("updateSelectedUser.html");
}
function acceptOwnerByIndex(index) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users[index].status = "accepted";

  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function denyOwnerByIndex(index) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");

  users[index].status = "denied";

  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function displayAllUsers() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var content = ``;

  for (let i = 0; i < users.length; i++) {
    if (users[i].role === "admin" || users[i].role === "client") {
      content =
        content +
        `
<tr> <td><h5>${users[i].firstName}</h5></td>
<td><h5>${users[i].lastName}</h5>
<td><h5>${users[i].adresse}</h5>
<td><h5>${users[i].telephone}</h5>
<td><h5>${users[i].email}</h5>
<td><h5>-----</h5></td>
<td><h5>${users[i].role}</h5>
<td class="d-flex"><button class="btn btn-warning mr-1"   onclick="deleteUserByIndex(${i})">delete</button>
<button class="btn btn-warning "   onclick="updateUserIndex(${i})">update</button>
</td></tr>`;
    } else {
      if (users[i].status === "not_accepted_yet") {
        content =
          content +
          `
  <tr> <td><h5>${users[i].firstName}</h5></td>
  <td><h5>${users[i].lastName}</h5>
  <td><h5>${users[i].adresse}</h5>
  <td><h5>${users[i].telephone}</h5>
  <td><h5>${users[i].email}</h5>
  <td><h5>${users[i].status}</h5></td>
  <td><h5>${users[i].role}</h5>
  <td class="d-flex"><button class="btn btn-warning ml-l"   onclick="deleteUserByIndex(${i})">delete</button>
  <button class="btn btn-warning ml-1"   onclick="updateUserIndex(${i})">update</button>
  <button class="btn btn-warning ml-1"   onclick="acceptOwnerByIndex(${i})">accept</button>
  <button class="btn btn-warning ml-1"   onclick="denyOwnerByIndex(${i})">deny</button>
  </td></tr>`;
      } else {
        content =
          content +
          `
  <tr> <td><h5>${users[i].firstName}</h5></td>
  <td><h5>${users[i].lastName}</h5>
  <td><h5>${users[i].adresse}</h5>
  <td><h5>${users[i].telephone}</h5>
  <td><h5>${users[i].email}</h5>
  <td><h5>${users[i].status}</h5></td>
  <td><h5>${users[i].role}</h5>
  <td class="d-flex"><button class="btn btn-warning mr-1 "   onclick="deleteUserByIndex(${i})">delete</button>
  <button class="btn btn-warning "   onclick="updateUserIndex(${i})">update</button>
  </td></tr>`;
      }
    }
  }

  document.getElementById("my_tr_users").innerHTML = content;
}

function searchedHouses() {
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");
  var searchedHouse = localStorage.getItem("searchedHouse");
  content = ``;

  for (let i = 0; i < houses.length; i++) {
    if (
      houses[i].name === searchedHouse ||
      houses[i].description === searchedHouse
    ) {
      content =
        content +
        `       
      <div class="col-lg-4 col-md-6">
      <div class="blog-item set-bg" data-setbg="${houses[i].imageUrl}">
        <div class="bi-text">
          <span class="b-tag"  onclick="seeHouseDetails(${i})">See more</span>
          <h4><a href="./blog-details.html">${houses[i].name}</a></h4>
          <div class="b-time">
            <i class="icon_clock_alt"></i> ${houses[i].town}
          </div>
        </div>
      </div>
    </div>
    `;
    }
  }

  document.getElementById("allHouses").innerHTML = content;
}

function searchHouses() {
  var searchInput = document.getElementById("searchInput").value;
  localStorage.setItem("searchedHouse", searchInput);
  location.reload();
}

function search() {
  location.replace("search.html");
}

function displayOwnerReservations() {
  var connectedUser = localStorage.getItem("connectedUserId");
  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  var ownerHouses = getTableById("houses", connectedUser, "owner_id");
  var roomsOwner = [];
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < ownerHouses.length; j++) {
      if (rooms[i].houseId == ownerHouses[j].id) {
        roomsOwner.push(rooms[i].id);
      }
    }
  }
  var content = ``;
  for (let i = 0; i < reservations.length; i++) {
    for (let j = 0; j < roomsOwner.length; j++) {
      if (reservations[i].idRoom == roomsOwner[j]) {
        var room = getObjectFromBaseById("rooms", reservations[i].idRoom);
        var house = getObjectFromBaseById("houses", room.houseId);
        var user = getObjectFromBaseById("users", reservations[i].idClient);

        var s1 = new Date(reservations[i].dateIn);
        var e1 = new Date(reservations[i].dateOut);
        content =
          content +
          `
<tr> <td><h5>${house.name}</h5></td>
<td><h5>${room.name}</h5></td>
<td><h5>${user.firstName}</h5></td>
<td><h5>${reservations[i].numberGuests}</h5></td>
<td><h5>${room.price}</h5></td>
<td><h5>${s1.getDate()}-${s1.getMonth() + 1}-${s1.getFullYear()}</h5></td>
<td><h5>${e1.getDate()}-${e1.getMonth() + 1}-${e1.getFullYear()}</h5></td>
<td><button class="btn btn-warning "   onclick="cancelReservationByID(${
            reservations[i].id
          })">Cancel reservation</button>
</td></tr>`;
      }
    }
  }

  document.getElementById("my_tr_reservations2").innerHTML = content;
}

function updateProfile() {
  var firstName = document.getElementById("first_name").value;
  var lastName = document.getElementById("last_name").value;
  var adresse = document.getElementById("adress").value;
  var telephone = document.getElementById("telephone").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var test = true;

  if (!verifyLength(firstName, 4)) {
    document.getElementById("nameError").innerHTML =
      "Please verify your first name";
    document.getElementById("nameError").style.color = "red";
    test = false;
  } else document.getElementById("nameError").innerHTML = "";

  if (!verifyLength(lastName, 4)) {
    document.getElementById("lastNameError").innerHTML =
      "Please verify your last name";
    document.getElementById("lastNameError").style.color = "red";
    test = false;
  } else document.getElementById("lastNameError").innerHTML = "";

  if (!verifyLength(adresse, 4)) {
    document.getElementById("adressError").innerHTML =
      "Please verify your adress";
    document.getElementById("adressError").style.color = "red";
    test = false;
  } else document.getElementById("adressError").innerHTML = "";

  if (!verifyLength(email, 4)) {
    document.getElementById("emailError").innerHTML =
      "Please verify your email adress";
    document.getElementById("emailError").style.color = "red";
    test = false;
  } else document.getElementById("emailError").innerHTML = "";

  if (!verifyTel(telephone.toString())) {
    document.getElementById("telephoneError").innerHTML =
      "Please verify your phone number";
    document.getElementById("telephoneError").style.color = "red";
    test = false;
  } else document.getElementById("telephoneError").innerHTML = "";

  if (!verifyLength(password, 3)) {
    document.getElementById("passwordError").innerHTML =
      "Pass must contain at least 4 chars";
    document.getElementById("passwordError").style.color = "red";
    test = false;
    return;
  } else document.getElementById("passwordError").innerHTML = "";

  if (!test) {
    return;
  } else {
    var connected = localStorage.getItem("connectedUserId");
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    for (let i = 0; i < users.length; i++) {
      if (users[i].id == connected) {
        users[i].firstName = firstName;
        users[i].lastName = lastName;
        users[i].email = email;
        users[i].telephone = telephone;
        users[i].adresse = adresse;
        users[i].password = password;
        break;
      }
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  alert("Your profile has been updated succesfully!");
  location.reload();
}

function populateProfile() {
  var connected = localStorage.getItem("connectedUserId");
  var myUser = getObjectFromBaseById("users", connected);

  document.getElementById("first_name").value = myUser.firstName;
  document.getElementById("last_name").value = myUser.lastName;
  document.getElementById("email").value = myUser.email;
  document.getElementById("adress").value = myUser.adresse;
  document.getElementById("telephone").value = myUser.telephone;
  document.getElementById("password").value = myUser.password;
}

function cancelReservationByID(id) {
  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  var index = searchPositionByIdAndKey("reservations", id);
  reservations.splice(index, 1);
  localStorage.setItem("reservations", JSON.stringify(reservations));
  location.reload();
}

function displayUserReservations() {
  var connectedUser = localStorage.getItem("connectedUserId");
  var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
  var content = ``;
  for (let i = 0; i < reservations.length; i++) {
    if (reservations[i].idClient == connectedUser) {
      var room = getObjectFromBaseById("rooms", reservations[i].idRoom);
      var house = getObjectFromBaseById("houses", room.houseId);
      var s1 = new Date(reservations[i].dateIn);
      var e1 = new Date(reservations[i].dateOut);
      content =
        content +
        `
<tr> <td><h5>${house.name}</h5></td>
<td><h5>${room.name}</h5></td>
<td><h5>${reservations[i].numberGuests}</h5></td>
<td><h5>${room.price}</h5></td>
<td><h5>${s1.getDate()}-${s1.getMonth() + 1}-${s1.getFullYear()}</h5></td>
<td><h5>${e1.getDate()}-${e1.getMonth() + 1}-${e1.getFullYear()}</h5></td>
<td><button class="btn btn-warning "   onclick="cancelReservationByID(${
          reservations[i].id
        })">Cancel reservation</button>
</td></tr>`;
    }
  }

  document.getElementById("my_tr_reservations").innerHTML = content;
}

function checkAvailability() {
  var guestsNumber = document.getElementById("guestsNumber").value;
  var checkIn = document.getElementById("date-in").value;
  var checkOut = document.getElementById("date-out").value;
  var myRoom = getObjectFromBaseById(
    "rooms",
    localStorage.getItem("selectedRoomId")
  );
  var test = true;
  var testInterval = true;

  if (!verifyLength(checkIn, 0)) {
    document.getElementById("check_in_error").innerHTML =
      "Please verify your room's check in date";
    document.getElementById("check_in_error").style.color = "red";
    test = false;
  } else document.getElementById("check_in_error").innerHTML = "";

  if (!verifyLength(checkOut, 0)) {
    document.getElementById("check_out_error").innerHTML =
      "Please verify room's check out date";
    document.getElementById("check_out_error").style.color = "red";
    test = false;
  } else document.getElementById("check_out_error").innerHTML = "";

  if (!verifyInterval(guestsNumber, 0, Number(myRoom.capacity) + 1)) {
    document.getElementById("guests_number_error").innerHTML =
      "Number of guests must be between 1 and the total capacity of the room";
    document.getElementById("guests_number_error").style.color = "red";
    test = false;
  } else document.getElementById("guests_number_error").innerHTML = "";

  if (test) {
    var dateIn = new Date(checkIn);
    var dateOut = new Date(checkOut);
    var reservations = JSON.parse(localStorage.getItem("reservations") || "[]");

    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].idRoom == localStorage.getItem("selectedRoomId")) {
        if (
          doIntervalsCoincide(
            new Date(reservations[i].dateIn),
            new Date(reservations[i].dateOut),
            dateIn,
            dateOut
          )
        ) {
          alert("the room is booked in that time interval");
          testInterval = false;
          break;
          return;
        }
      }
    }

    if (testInterval) {
      var idReservation = addID(reservations);
      var myReservation = {
        id: idReservation,
        idRoom: localStorage.getItem("selectedRoomId"),
        idClient: localStorage.getItem("connectedUserId"),
        numberGuests: guestsNumber,
        dateIn: dateIn.toString(),
        dateOut: dateOut.toString(),
      };
      reservations.push(myReservation);
      localStorage.setItem("reservations", JSON.stringify(reservations));
      alert("Your reservation have been added succesfully!");
    }
  }
}

function populateRoomDetails() {
  var myRoom = getObjectFromBaseById(
    "rooms",
    localStorage.getItem("selectedRoomId")
  );
  var myHouse = getObjectFromBaseById("houses", myRoom.houseId);

  document.getElementById("houseName").innerHTML = myHouse.name;
  document.getElementById("roomNameSpan").innerHTML = myRoom.name;
  document.getElementById("roomPrice").innerHTML = myRoom.price + "$ /Pernight";
  document.getElementById("capacitySpan").innerHTML =
    myRoom.capacity + " person(s)";
}

function tryReservationRoomById(id) {
  localStorage.setItem("selectedRoomId", id);
  location.replace("room-details.html");
}

function displayHouseRooms() {
  var indexHouse = localStorage.getItem("selectedHouseIndex");
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  var content = ``;

  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].houseId == houses[indexHouse].id) {
      content =
        content +
        `
    <tr> <td><h5>${rooms[i].name}</h5></td>
    <td><h5>${rooms[i].description}</h5></td>

   <td><h5>${rooms[i].price}</h5></td>
   <td><h5>${rooms[i].capacity}</h5></td>



   <td><button class="btn btn-warning "   onclick="tryReservationRoomById(${rooms[i].id})">Try and book reservation</button>

   </td>


     </tr>`;
    }
  }

  document.getElementById("my_tr_rooms2").innerHTML = content;
}

function houseDetailsScript() {
  var selected = localStorage.getItem("selectedHouseIndex");
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");
  var selectedHouse = houses[selected];
  var totalRooms = searchTotalRoomsByIdHouse(selectedHouse.id);

  document.getElementById(
    "imagePath"
  ).innerHTML = `<img src=${selectedHouse.imageUrl} style="width:350px;height:300px"></img>`;
  document.getElementById("houseName").innerHTML = selectedHouse.name;
  document.getElementById("houseTown").innerHTML = selectedHouse.town;
  document.getElementById("houseAdress").innerHTML = selectedHouse.adress;
  document.getElementById("houseRoomsNumber").innerHTML = totalRooms;
  document.getElementById("houseDescription").innerHTML =
    selectedHouse.description;
}

function seeHouseDetails(index) {
  localStorage.setItem("selectedHouseIndex", index);
  location.replace("houseDetails.html");
}

function allHouses() {
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");
  content = ``;

  for (let i = 0; i < houses.length; i++) {
    content =
      content +
      `       
      <div class="col-lg-4 col-md-6">
      <div class="blog-item set-bg" data-setbg="${houses[i].imageUrl}">
        <div class="bi-text">
          <span class="b-tag"  onclick="seeHouseDetails(${i})">See more</span>
          <h4><a href="./blog-details.html">${houses[i].name}</a></h4>
          <div class="b-time">
            <i class="icon_clock_alt"></i> ${houses[i].town}
          </div>
        </div>
      </div>
    </div>
    `;
  }

  document.getElementById("allHouses").innerHTML = content;
}

function updateRoom() {
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  var idRoom = localStorage.getItem("selectedRoomId");
  var index = searchPositionByIdAndKey("rooms", idRoom);

  rooms[index].name = document.getElementById("name").value;
  rooms[index].description = document.getElementById("description").value;
  rooms[index].capacity = document.getElementById("capacity").value;
  rooms[index].price = document.getElementById("price").value;
  localStorage.setItem("rooms", JSON.stringify(rooms));
  alert("room updated succesfully!");
}

function populateUpdateRoom() {
  var idRoom = localStorage.getItem("selectedRoomId");
  var myRoom = getObjectFromBaseById("rooms", idRoom);

  document.getElementById("name").value = myRoom.name;
  document.getElementById("description").value = myRoom.description;
  document.getElementById("price").value = myRoom.price;
  document.getElementById("capacity").value = myRoom.capacity;
}

function deleteRoomByID(id) {
  var index = searchPositionByIdAndKey("rooms", id);
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");

  rooms.splice(index, 1);
  localStorage.setItem("rooms", JSON.stringify(rooms));
  alert("room deleted succesfully!");
  location.reload();
}

function updateRoomByID(id) {
  localStorage.setItem("selectedRoomId", id);
  location.replace("updateRoom.html");
}

function displayOwnerRooms() {
  var idOwner = localStorage.getItem("connectedUserId");
  var ownerHouses = getTableById("houses", idOwner, "owner_id");
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  var content = ``;
  for (let index = 0; index < ownerHouses.length; index++) {
    for (let j = 0; j < rooms.length; j++) {
      if (ownerHouses[index].id == rooms[j].houseId) {
        content =
          content +
          `
          <tr> <td><h5>${ownerHouses[index].name}</h5></td>
    <td><h5>${rooms[j].name}</h5></td>
    <td><h5>${rooms[j].description}</h5></td>

   <td><h5>${rooms[j].price}</h5></td>
   <td><h5>${rooms[j].capacity}</h5></td>



   <td><button class="btn btn-warning "   onclick="deleteRoomByID(${rooms[j].id})">Delete</button>
   <button class="btn btn-warning ml-2 " onclick="updateRoomByID(${rooms[j].id})">Update</button>
   </td>


     </tr>`;
      }
    }
  }

  document.getElementById("my_tr_rooms").innerHTML = content;
}

function getTableById(key, id, attribut) {
  var tab = JSON.parse(localStorage.getItem(key) || "[]");

  var returnedTab = [];

  for (let i = 0; i < tab.length; i++) {
    if (tab[i][attribut] == id) {
      returnedTab.push(tab[i]);
    }
  }

  return returnedTab;
}

function addRoom() {
  var name = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var capacity = document.getElementById("capacity").value;
  var test = true;

  if (!verifyLength(name, 4)) {
    document.getElementById("nameError").innerHTML =
      "Please verify your room's name";
    document.getElementById("nameError").style.color = "red";
    test = false;
  } else document.getElementById("nameError").innerHTML = "";

  if (!verifyLength(description, 4)) {
    document.getElementById("descriptionError").innerHTML =
      "Please verify your description";
    document.getElementById("descriptionError").style.color = "red";
    test = false;
  } else document.getElementById("descriptionError").innerHTML = "";

  if (!verifyPositivity(price)) {
    document.getElementById("priceError").innerHTML =
      "Please verify your price";
    document.getElementById("priceError").style.color = "red";
    test = false;
  } else document.getElementById("priceError").innerHTML = "";

  if (!verifyInterval(capacity, 0, 11)) {
    document.getElementById("capacityError").innerHTML =
      "Please verify your capacity";
    document.getElementById("capacityError").style.color = "red";
    test = false;
  } else document.getElementById("capacityError").innerHTML = "";

  if (test) {
    var totalRooms = searchTotalRoomsByIdHouse(
      localStorage.getItem("selectedHouseId")
    );

    if (totalRooms === 5) {
      alert("you can't add more than 5 rooms to a single house!");
      return;
    }

    var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    var roomId = addID(rooms);
    var room = {
      id: roomId,
      name: name,
      description: description,
      price: price,
      capacity: capacity,
      houseId: localStorage.getItem("selectedHouseId"),
    };

    rooms.push(room);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    alert("Room added succsefully!");
  }
}

function getHouseName() {
  var house = getObjectFromBaseById(
    "houses",
    localStorage.getItem("selectedHouseId")
  );
  document.getElementById("houseName").innerHTML = house.name;
}

function addRoomHouseByID(id) {
  localStorage.setItem("selectedHouseId", id);
  location.replace("addRoom.html");
}

function updateHouse() {
  var idHouse = localStorage.getItem("selectedHouseId");
  var myHouse = getObjectFromBaseById("houses", idHouse);
  var myHouses = JSON.parse(localStorage.getItem("houses"));

  myHouse.name = document.getElementById("name").value;
  myHouse.adress = document.getElementById("adress").value;
  myHouse.description = document.getElementById("description").value;
  myHouse.town = document.getElementById("town").value;
  myHouse.imageUrl = document.getElementById("image").value;

  var index = searchPositionByIdAndKey("houses", idHouse);
  myHouses[index] = myHouse;

  localStorage.setItem("houses", JSON.stringify(myHouses));
  alert("house updated succesfully");
}

function loadSelectedHouse() {
  var idHouse = localStorage.getItem("selectedHouseId");
  var myHouse = getObjectFromBaseById("houses", idHouse);

  document.getElementById("name").value = myHouse.name;
  document.getElementById("adress").value = myHouse.adress;
  document.getElementById("description").value = myHouse.description;
  document.getElementById("town").value = myHouse.town;
  document.getElementById("image").value = myHouse.imageUrl;
}

function searchPositionByIdAndKey(key, id) {
  var myTab = JSON.parse(localStorage.getItem(key) || "[]");

  for (let i = 0; i < myTab.length; i++) {
    if (myTab[i].id == id) {
      return i;
    }
  }

  return "none";
}

function getObjectFromBaseById(key, id) {
  myTab = JSON.parse(localStorage.getItem(key));

  for (let i = 0; i < myTab.length; i++) {
    if (myTab[i].id == id) {
      return myTab[i];
    }
  }
  return {};
}

function deleteHouseByID(id) {
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");
  var position = searchPositionByIdAndKey("houses", id);
  houses.splice(position, 1);

  localStorage.setItem("houses", JSON.stringify(houses));
  location.reload();
}

function updateHouseByID(id) {
  localStorage.setItem("selectedHouseId", id);
  location.replace("updateHouse.html");
}

function searchPositionByIdAndKey(key, id) {
  var myTab = JSON.parse(localStorage.getItem(key) || "[]");

  for (let i = 0; i < myTab.length; i++) {
    if (myTab[i].id == id) {
      return i;
    }
  }

  return "none";
}

function displayOwnerHouses() {
  var content = ``;
  var houses = JSON.parse(localStorage.getItem("houses") || "[]");
  var id_user = localStorage.getItem("connectedUserId");

  for (let i = 0; i < houses.length; i++) {
    if (houses[i].owner_id == id_user) {
      content =
        content +
        `
      <tr> <td><h5>${houses[i].name}</h5></td>
     <td><img src="${houses[i].imageUrl}" style="width:150px"></img></td>

     <td><h5>${houses[i].adress}</h5></td>
     <td><h5>${houses[i].description}</h5></td>
     <td><h5>${houses[i].town}</h5></td>

     <td><h5>${searchTotalRoomsByIdHouse(houses[i].id)}</h5></td>
     <td class="d-flex"><button class="btn btn-warning " onclick="deleteHouseByID(${
       houses[i].id
     })">Delete</button><button class="btn btn-warning ml-2 mr-2" onclick="updateHouseByID(${
          houses[i].id
        })">Update</button>

    <button class="btn btn-warning " onclick="addRoomHouseByID(${
      houses[i].id
    })"> + room</button>
 
       </tr>`;
    }
  }

  document.getElementById("my_tr").innerHTML = content;
}

function searchTotalRoomsByIdHouse(id) {
  var rooms = JSON.parse(localStorage.getItem("rooms") || "[]");
  if (rooms.length === 0) {
    return 0;
  }
  var counter = 0;
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].houseId == id) {
      counter++;
    }
  }
  return counter;
}

function addHouse() {
  var name = document.getElementById("name").value;
  var desc = document.getElementById("description").value;
  var adress = document.getElementById("adress").value;
  var image = document.getElementById("image").value;
  var town = document.getElementById("town").value;

  var userId = localStorage.getItem("connectedUserId");
  var test = true;

  if (!verifyLength(name, 4)) {
    document.getElementById("nameError").innerHTML =
      "Please verify your house name";
    document.getElementById("nameError").style.color = "red";
    test = false;
  } else document.getElementById("nameError").innerHTML = "";

  if (!verifyLength(desc, 6)) {
    document.getElementById("descriptionError").innerHTML =
      "Please verify your description";
    document.getElementById("descriptionError").style.color = "red";
    test = false;
  } else document.getElementById("descriptionError").innerHTML = "";

  if (!verifyLength(adress, 4)) {
    document.getElementById("adressError").innerHTML =
      "Please verify your adress";
    document.getElementById("adressError").style.color = "red";
    test = false;
  } else document.getElementById("adressError").innerHTML = "";

  if (!verifyLength(town, 4)) {
    document.getElementById("townError").innerHTML = "Please verify your town";
    document.getElementById("townError").style.color = "red";
    test = false;
  } else document.getElementById("townError").innerHTML = "";

  if (test) {
    var houses = JSON.parse(localStorage.getItem("houses") || "[]");
    var houseId = addID(houses);
    houses.push({
      id: houseId,
      name: name,
      description: desc,
      town: town,
      adress: adress,
      imageUrl: image,
      owner_id: userId,
    });

    localStorage.setItem("houses", JSON.stringify(houses));
    alert("house added succesfully!");
    location.reload();
  }
}

function addHeader() {
  var id = localStorage.getItem("connectedUserId");
  var content;

  var myUser = getUserByID(id);

  if (!myUser) {
    content = `  <header class="header-section">
  <div class="menu-item">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="logo">
            <a href="./index.html">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="nav-menu">
            <nav class="mainmenu">
              <ul>
                <li><a href="./index.html">Home</a></li>
                <li><a href="./allHouses.html">All houses</a></li>

                <li><a href="./login.html">Login</a></li>
                <li>
                  <a href="./sign-up-client.html">Sign up as client</a>
                </li>
                <li>
                  <a href="./sign-up-owner.html">Sign up as owner</a>
                </li>
                <li><a href="./contact.html">Contact</a></li>
              </ul>
            </nav>
            <div class="nav-right search-switch">
              <i class="icon_search" onClick="search()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>`;
  } else {
    if (myUser.role === "admin") {
      content = `  <header class="header-section">
  <div class="menu-item">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="logo">
            <a href="./index.html">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="nav-menu">
            <nav class="mainmenu">
              <ul>
                <li ><a href="./homeAdmin.html">Home</a></li>
                </li>
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="./profile.html">My profile</a></li>
                <li onClick="logout()"><a>Logout</a></li>
              </ul>
            </nav>
            <div class="nav-right search-switch">
               <i class="icon_search" onClick="search()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>`;
    } else if (myUser.role === "client") {
      content = `  <header class="header-section">
  <div class="menu-item">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="logo">
            <a href="./index.html">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="nav-menu">
            <nav class="mainmenu">
              <ul>
                <li ><a href="./allHouses.html">Home</a></li>

                <li>
                  <a href="./myUsersReservations.html">My reservations</a>
                </li>
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="./profile.html">My profile</a></li>
                <li onClick="logout()"><a>Logout</a></li>
              </ul>
            </nav>
            <div class="nav-right search-switch">
               <i class="icon_search" onClick="search()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>`;
    } else if (myUser.role === "owner") {
      content = `  <header class="header-section">
  <div class="menu-item">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="logo">
            <a href="./index.html">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="nav-menu">
            <nav class="mainmenu">
              <ul>
                <li ><a href="./homeOwner.html">Home</a></li>
                <li><a href="./allHouses.html">All houses</a></li>

                <li>
                  <a href="./myUsersReservations.html">Reservations</a>
                </li>
               
                <li><a href="./contact.html">Contact</a></li>
                <li><a href="./profile.html">My profile</a></li>
                <li onClick="logout()"><a>Logout</a></li>
              </ul>
            </nav>
            <div class="nav-right search-switch">
               <i class="icon_search" onClick="search()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>`;
    }
  }
  document.getElementById("header").innerHTML = content;
}

function logout() {
  localStorage.removeItem("connectedUserId");
  location.replace("index.html");
}

function getUserByID(id) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
    }
  }

  return undefined;
}

function login() {
  var email = document.getElementById("email_login").value;
  var password = document.getElementById("password_login").value;
  var test = false;
  document.getElementById("email_login_error").innerHTML = "";

  if (email === "" || password === "") {
    document.getElementById("email_login_error").innerHTML =
      "Please feel in the form";
    document.getElementById("email_login_error").style.color = "red";
    return;
  }

  var myUsers = JSON.parse(localStorage.getItem("users") || "[]");

  if (myUsers.length === 0) {
    document.getElementById("email_login_error").innerHTML =
      "We dont have a user signed up with these credentials";
    document.getElementById("email_login_error").style.color = "red";
    return;
  }

  for (let i = 0; i < myUsers.length; i++) {
    console.log(0, email);
    console.log(0, myUsers[i].email);

    if (myUsers[i].email === email && myUsers[i].password === password) {
      if (myUsers[i].role === "owner" && myUsers[i].status === "accepted") {
        localStorage.setItem("connectedUserId", myUsers[i].id);
        location.replace("./homeOwner.html");
        test = true;
        break;
      } else if (myUsers[i].role === "client") {
        localStorage.setItem("connectedUserId", myUsers[i].id);
        location.replace("./allHouses.html");
        test = true;
        break;
      } else if (
        myUsers[i].role === "owner" &&
        myUsers[i].status === "denied"
      ) {
        document.getElementById("email_login_error").innerHTML =
          "You have been denied access to this website";
        document.getElementById("email_login_error").style.color = "red";
        test = true;
      } else if (
        myUsers[i].role === "owner" &&
        myUsers[i].status === "not_accepted_yet"
      ) {
        document.getElementById("email_login_error").innerHTML =
          "You must wait until an admin approves your subscription";
        document.getElementById("email_login_error").style.color = "red";
        test = true;
      } else if (myUsers[i].role === "admin") {
        localStorage.setItem("connectedUserId", myUsers[i].id);
        location.replace("./homeAdmin.html");
        test = true;
        break;
      }
    }
  }
  if (!test) {
    document.getElementById("email_login_error").innerHTML =
      "We dont have a user signed in with these credentials";
    document.getElementById("email_login_error").style.color = "red";
    return;
  }
}

function SignUpClient() {
  var test = true;
  var firstName = document.getElementById("first_name_client").value;
  var lastName = document.getElementById("last_name_client").value;
  var adresse = document.getElementById("adresse_client").value;
  var telephone = document.getElementById("telephone_client").value;
  var email = document.getElementById("email_client").value;
  var pass = document.getElementById("password_client").value;
  var confirmPass = document.getElementById("password_confirm_client").value;

  if (!verifyLength(firstName, 4)) {
    document.getElementById("first_name_client_error").innerHTML =
      "Please verify your first name";
    document.getElementById("first_name_client_error").style.color = "red";
    test = false;
  } else document.getElementById("first_name_client_error").innerHTML = "";

  if (!verifyLength(lastName, 4)) {
    document.getElementById("last_name_client_error").innerHTML =
      "Please verify your last name";
    document.getElementById("last_name_client_error").style.color = "red";
    test = false;
  } else document.getElementById("last_name_client_error").innerHTML = "";

  if (!verifyLength(adresse, 4)) {
    document.getElementById("adresse_client_error").innerHTML =
      "Please verify your adress";
    document.getElementById("adresse_client_error").style.color = "red";
    test = false;
  } else document.getElementById("adresse_client_error").innerHTML = "";

  if (!verifyLength(email, 4)) {
    document.getElementById("email_client_error").innerHTML =
      "Please verify your email adress";
    document.getElementById("email_client_error").style.color = "red";
    test = false;
  } else document.getElementById("email_client_error").innerHTML = "";

  if (!verifyTel(telephone.toString())) {
    document.getElementById("telephone_client_error").innerHTML =
      "Please verify your phone number";
    document.getElementById("telephone_client_error").style.color = "red";
    test = false;
  } else document.getElementById("telephone_client_error").innerHTML = "";

  if (!verifyLength(pass, 3)) {
    document.getElementById("password_client_error").innerHTML =
      "Pass must contain at least 4 chars";
    document.getElementById("password_client_error").style.color = "red";
    test = false;
    return;
  } else document.getElementById("password_client_error").innerHTML = "";

  if (!comparPass(pass, confirmPass)) {
    document.getElementById("password_client_error").innerHTML =
      "Passwords do not match";
    document.getElementById("password_client_error").style.color = "red";
    test = false;
  } else document.getElementById("password_client_error").innerHTML = "";

  if (test) {
    var myUsers = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < myUsers.length; i++) {
      if (myUsers[i].email === email) {
        document.getElementById("email_client_error").innerHTML =
          "This email is already used";
        document.getElementById("email_client_error").style.color = "red";
        return;
      }
    }

    var id = addID(myUsers);
    var myUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      adresse: adresse,
      telephone: telephone,
      email: email,
      password: pass,
      role: "client",
    };
    myUsers.push(myUser);
    localStorage.setItem("users", JSON.stringify(myUsers));
    alert("you have been added succesfully, you can login any time you want!");
    location.replace("./login.html");
  }
}

function SignUpOwner() {
  var test = true;
  var firstName = document.getElementById("first_name_owner").value;
  var lastName = document.getElementById("last_name_owner").value;
  var adresse = document.getElementById("adresse_owner").value;
  var telephone = document.getElementById("telephone_owner").value;
  var email = document.getElementById("email_owner").value;
  var pass = document.getElementById("password_owner").value;
  var confirmPass = document.getElementById("password_confirm_owner").value;

  if (!verifyLength(firstName, 4)) {
    document.getElementById("first_name_owner_error").innerHTML =
      "Please verify your first name";
    document.getElementById("first_name_owner_error").style.color = "red";
    test = false;
  } else document.getElementById("first_name_owner_error").innerHTML = "";

  if (!verifyLength(lastName, 4)) {
    document.getElementById("last_name_owner_error").innerHTML =
      "Please verify your last name";
    document.getElementById("last_name_owner_error").style.color = "red";
    test = false;
  } else document.getElementById("last_name_owner_error").innerHTML = "";

  if (!verifyLength(adresse, 4)) {
    document.getElementById("adresse_owner_error").innerHTML =
      "Please verify your adress";
    document.getElementById("adresse_owner_error").style.color = "red";
    test = false;
  } else document.getElementById("adresse_owner_error").innerHTML = "";

  if (!verifyLength(email, 4)) {
    document.getElementById("email_owner_error").innerHTML =
      "Please verify your email adress";
    document.getElementById("email_owner_error").style.color = "red";
    test = false;
  } else document.getElementById("email_owner_error").innerHTML = "";

  if (!verifyTel(telephone.toString())) {
    document.getElementById("telephone_owner_error").innerHTML =
      "Please verify your phone number";
    document.getElementById("telephone_owner_error").style.color = "red";
    test = false;
  } else document.getElementById("telephone_owner_error").innerHTML = "";

  if (!verifyLength(pass, 3)) {
    document.getElementById("password_owner_error").innerHTML =
      "Pass must contain at least 4 chars";
    document.getElementById("password_owner_error").style.color = "red";
    test = false;
    return;
  } else document.getElementById("password_owner_error").innerHTML = "";

  if (!comparPass(pass, confirmPass)) {
    document.getElementById("password_owner_error").innerHTML =
      "Passwords do not match";
    document.getElementById("password_owner_error").style.color = "red";
    test = false;
  } else document.getElementById("password_owner_error").innerHTML = "";

  if (test) {
    var myUsers = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < myUsers.length; i++) {
      if (myUsers[i].email === email) {
        document.getElementById("email_owner_error").innerHTML =
          "This email is already used";
        document.getElementById("email_owner_error").style.color = "red";
        return;
      }
    }
    var id = addID(myUsers);
    var myUser = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      adresse: adresse,
      telephone: telephone,
      email: email,
      password: pass,
      role: "owner",
      status: "not_accepted_yet",
    };
    myUsers.push(myUser);
    localStorage.setItem("users", JSON.stringify(myUsers));
    alert(
      "you have been added succesfully. Now you must wait for an admin confirmation before you can login"
    );
    localStorage.setItem("connectedUserId", "");
    location.replace("./login.html");
  }
}

function addID(tab) {
  if (tab.length === 0) {
    return 1;
  }
  var max = tab[0].id;

  for (let index = 1; index < tab.length; index++) {
    if (tab[index].id > max) {
      max = tab[index].id;
    }
  }
  return max + 1;
}

function getObjectFromBaseById(key, id) {
  myTab = JSON.parse(localStorage.getItem(key));

  for (let i = 0; i < myTab.length; i++) {
    if (myTab[i].id == id) {
      return myTab[i];
    }
  }
  return {};
}

function verifyLength(ch, length) {
  if (ch.length > length) {
    return true;
  } else return false;
}

function verifyTel(ch) {
  if (ch.length === 8) {
    return true;
  } else return false;
}

function verifNumber(ch) {
  if (ch.length === 8) return true;
  else return false;
}

function comparPass(pwd, pwdConfirm) {
  if (pwd === pwdConfirm) return true;
  else return false;
}
function verifyPositivity(ch) {
  if (Number(ch) > 0) return true;
  else return false;
}

function verifyInterval(ch, min, max) {
  if (Number(ch) > min && Number(ch) < max) return true;
  else return false;
}

function doIntervalsCoincide(startDate1, endDate1, startDate2, endDate2) {

  // Check if either interval is completely before or after the other
  if (endDate1 < startDate2 || endDate2 < startDate1) {
    return false;
  }

  // If the above condition is not met, the intervals coincide on some days
  return true;
}
