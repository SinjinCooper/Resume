
var a = "Eeek is wanted for various war crimes commited against the IDGAF. Serves the Jin'opian Empire, last seen on Melgor.";


// dynamically create table from bounties list
//  -Target-  -Location-  -Reward-  -Requesting Party-
var bounties_list = [
    ["Eeek", "MELGOR", "150,000 cr.", "I.D.G.A.F."],
    ["Robert Olmstead", "MOKRI", "10,000 cr", "OLMSTEAD ESTATE"],
    ["Woogledoo", "POOLEMIT", "20,000 cr.", "I.D.G.A.F."],
    ["Torik Veld", "PIDWAAG", "12,500 cr.", "UNITED AEROSPACE DISTRIBUTORS"],
    ["Mr. John", "SVABODNAYA", "10,000 cr.", "ZEYRU CORP."],
    ["Giovanni Giorgio", "MORODER", "9,060 cr.", "PAFT DUNK"],
    ["Moby Duke", "MOKRI", "8,000 cr.", "CAPTAIN REHAB"]
]

for (let i = 0; i < bounties_list.length; i++) {
    var table = document.getElementById("bounty_table");
    var row = table.insertRow();
    row.addEventListener("click", showDetails.bind(this, bounties_list[i]), false);

    for (let j = 0; j < 4; j++) {
        row.insertCell(j).innerHTML = bounties_list[i][j];
    }
}

// Create custom pop up window with target details.
function showDetails(bounty) {
    document.getElementById("name").innerHTML = bounty[0];
    document.getElementById("crime").innerHTML = bounty[1];  
    
    var stats =  document.getElementById("details_popup").style.display;
  
    if (stats == "none") {
	    document.getElementById("details_popup").style.display = "inline-block";
	} else {
		document.getElementById("details_popup").style.display = "none";  
	}
}