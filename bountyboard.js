// dynamically create table from bounties list
//  -Target-  -Location-  -Reward-  -Requesting Party-  -Crime-  -Descr-  -Image-
var bounties_list = [
    ["Eeek", "MELGOR - Jin'Opian System", "150,000 cr. A / 50,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD",
        `War General for the Jin'opian Empire. Wanted for multiple war crimes committed
        against the IDGAF among the outer rim planets. Last known whereabouts are the Planet
        Melgor in the Supaago System.`, "possible_Eeek.jpg"],
    ["Woogledoo", "POOLEMIT - Zhistaan System", "20,000 cr. A / 15,000 cr. D", "I.D.G.A.F.", "ALIVE/DEAD",
        `Dangerous Octoid. Wanted for maiming, mutilation, and dismemberment. Believed to be hiding
        on Poolemit, an obscure planet of unknown atmospheric classification. Caution is highly advised.`, "woogledoo.jpg"],
    ["Me Lucky Charms", "MARS 2 - S\'Era System", "17,300 cr.", "LUCKY THE LEPRECHAUN", "INTACT",
        `Help! Oi cahn't foind me lahcky chahrms! Oi balieve it's taht dryshite Trix Rabbut be
        stealin' me goods! Oi'll pay ye well for me ayght chahrms bahck, with a little extrae for
        tee gobshite rabbut's heed. Aijajiyjajiy!`, "rabbit_suit.jpg"],
    ["Torik Veld", "CORGUS NEN - Zhistaan System", "12,500 cr. A / 6,000 cr. D", "HORIZON SKY TECHNOLOGIES", "ALIVE/DEAD",
        `Religious zealot of the 'Icarians.' Wanted for trespassing, vandalism, and destruction of
        property. Currently hiding on Corgus Nen, precautions advised.`, "torik_veld.jpg"],
    ["Mr. John", "SVABODNAYA - Zvezda Slaviy System", "10,000 cr. D", "ZEYRU CORP.", "DEAD",
        `Extremely dangerous. Recommended to kill on sight. Wanted for leaking sensitive information
        to alien organizations who are enemies to humanity. Do not attempt to get close!
        \nReport to Zeyru Corp. headquarters on Terra Nueva for details.`, "redeye_scientist.jpg"],
    ["Unknown Trio", "Unknown", "30,000 cr. A / 15,000 cr. D", "HappyHappy Fish Food Corp.", "ALIVE/DEAD",
        `Unnamed threesome wanted for murder, theft, and destruction of the planet Dagon, 
        Cerulian System. Considered armed and extremely dangerous.`, "those_who_purge.jpg"]
        
    //["The Flux Capacitor", "planet", "10,000 cr.", "Mr. Fusion", "INTACT", "boop bee doop"]
    //["Giovanni Giorgio", "MORODER", "9,060 cr. A", "PAFT DUNK", "ALIVE",
    //    `His name is Giovanni Giorgio, but everyone just calls him Giorgio.`],


    // ["Moby Duke", "TERRA NUEVA", "8,000 cr. D", "CAPTAIN REHAB", "DEAD",
    //     `Ai be lookin' for a steady crew to help me hunt daoon the demon what took me leg and almost
    //     took me life! The bastard be on Dagon, but I be settin' sail from the Grand Massage Spaceport
    //     on Terra Nueva. If ye have a stout heart and keen mind, come find me at Dock 402.`]
    // ["Robert Olmstead", "DAGON", "15,000 cr. A", "OLMSTEAD ESTATE", "ALIVE",
    //     `My cousin has been missing for almost three weeks. I haven't seen or heard of him since
    //     he came back from his trip to Innsmouth on the planet Dagon. He kept muttering something
    //     about "the deep, the deep" and "going into the water." Please see A. Olmstead on Terra Nueva
    //     for more information.`],
];

// COMMENTING OUT
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
    document.getElementById("target_img").src = bounty[6]
    document.getElementById("name").innerHTML = bounty[0];
    document.getElementById("location").innerHTML = bounty[1];
    document.getElementById("reward").innerHTML = bounty[2];
    document.getElementById("want_cond").innerHTML = bounty[4];
    document.getElementById("descr").innerHTML = bounty[5];
    
    var stats =  document.getElementById("details_popup").style.display;
  
    if (stats == "none") {
	    document.getElementById("details_popup").style.display = "inline-block";
	} else {
		document.getElementById("details_popup").style.display = "none";  
        document.getElementById("target_img").src = "";
	}
}