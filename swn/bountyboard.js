
var a = `Eeek, the War General for the Jin'opian Empire, is wanted for multiple war crimes committed
agains the IDGAF amongst the outer rim planets. His last known whereabouts are the Planet
Melgor in the`;

// dynamically create table from bounties list
//  -Target-  -Location-  -Reward-  -Requesting Party-  -Crime-  -Descr-
var bounties_list = [
    ["Eeek", "MELGOR", "150,000 cr. A / 50,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD",
        "test"],
    ["Robert Olmstead", "MOKRI", "10,000 cr. A", "OLMSTEAD ESTATE", "ALIVE", "Desc"],
    ["Woogledoo", "POOLEMIT", "20,000 cr. A / 15,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD", "Desc"],
    ["Torik Veld", "PIDWAAG", "12,500 cr. A / 6,000 cr. D", "UNITED AEROSPACE DISTRIBUTORS", "ALIVE/DEAD", "Desc"],
    ["Mr. John", "SVABODNAYA", "10,000 cr. D", "ZEYRU CORP.", "DEAD", "Deasc"],
    ["Giovanni Giorgio", "MORODER", "9,060 cr. A", "PAFT DUNK", "ALIVE", "Desc"],
    ["Moby Duke", "MOKRI", "8,000 cr. D", "CAPTAIN REHAB", "DEAD", "Desc"]
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
    document.getElementById("location").innerHTML = bounty[1];
    document.getElementById("reward").innerHTML = bounty[2];
    document.getElementById("wanted_status").innerHTML = bounty[4];  
    document.getElementById("descr").innerHTML = bounty[5];  
    
    var stats =  document.getElementById("details_popup").style.display;
  
    if (stats == "none") {
	    document.getElementById("details_popup").style.display = "inline-block";
	} else {
		document.getElementById("details_popup").style.display = "none";  
	}
}