// dynamically create table from bounties list
//  -Target-  -Location-  -Reward-  -Requesting Party-  -Crime-  -Descr-
var bounties_list = [
    ["Eeek", "MELGOR", "150,000 cr. A / 50,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD",
    `War General for the Jin'opian Empire. Wanted for multiple war crimes committed
    against the IDGAF among the outer rim planets. Last known whereabouts are the Planet
    Melgor in the`],
    ["Robert Olmstead", "MOKRI", "10,000 cr. A", "OLMSTEAD ESTATE", "ALIVE", "Desc"],
    ["Woogledoo", "POOLEMIT", "20,000 cr. A / 15,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD", "Desc"],
    ["Torik Veld", "PIDWAAG", "12,500 cr. A / 6,000 cr. D", "UNITED AEROSPACE DISTRIBUTORS", "ALIVE/DEAD", "Desc"],
    ["Mr. John", "SVABODNAYA", "10,000 cr. D", "ZEYRU CORP.", "DEAD", "Deasc"],
    ["Giovanni Giorgio", "MORODER", "9,060 cr. A", "PAFT DUNK", "ALIVE",
        `His name is Giovanni Giorgio, but everyone just calls him Giorgio.`],
    ["Moby Duke", "MOKRI", "8,000 cr. D", "CAPTAIN REHAB", "DEAD", "Desc"],
    ["Me Lucky Charms", "", "reward cr.", "LUCKY THE LEPRECHAUN", "INTACT",
        `Help! Oi cahn't foind me lahcky chahrms! Oi balieve it's taht dryshite Trix Rabbut be
        stealin' me goods! Oi'll pay ye well for me ayght chahrms bahck, with a little extrae for
        tee gobshite rabbut's heed. Aijajiyjajiy!`]
];

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