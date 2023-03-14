
var a = "Eeek is wanted for various war crimes commited against the IDGAF. Serves the Jin'opian Empire, last seen on Melgor.";


// dynamically create table from bounties list
//  -Target-  -Location-  -Reward-  -Requesting Party-
var bounties_list = [
    ["Eeek", "MELGOR", "150,000 cr.", "I.D.G.A.F."],
    ["Robert Olmstead", "MOKRI", "10,000 cr", "OLMSTEAD ESTATE"],
    ["Woogledoo", "POOLEMIT", "20,000 cr.", "I.D.G.A.F."],
    ["Torik Veld", "PIDWAAG", "12,500 cr.", "UNITED AEROSPACE DISTRIBUTORS"],
    ["Mr. John", "SVABODNAYA", "10,000 cr.", "ZEYRU CORP."],
    ["Giovanni Giorgio", "9,060", "MORODER", "PAFT DUNK"],
    ["Moby Duke", "MOKRI", "8,000", "CAPTAIN REHAB"]
]


var table = document.getElementById("bounty_table");

for (let i = 0; i < bounties_list.length; i++) {
    var row = table.insertRow();
    var cell0 = row.insertCell(0).innerHTML = bounties_list[i][0];
    var cell1 = row.insertCell(1).innerHTML = bounties_list[i][1];
    var cell2 = row.insertCell(2).innerHTML = bounties_list[i][2];
    var cell3 = row.insertCell(3).innerHTML = bounties_list[i][3];
  }

// Create custom pop up window with target details.
function showDetails(x) {
    x.innerHTML = a;
    x.classList.toggle("show");
}