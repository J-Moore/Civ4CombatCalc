var xml_data_dictionary = {};
var unit_name_listing = [];
var attacking_unit, defending_unit;
var chartjsDisplay;

//promotions dictionary
//TODO: change this to read from xml file
var promotion_master_dictionary = {
	'PROMOTION_COMBAT1': {'img': 'promo_combat1.gif', 'value': {'iCombatPercent': 10}},
	'PROMOTION_COMBAT2': {'img': 'promo_combat2.gif', 'value': {'iCombatPercent': 10}},
	'PROMOTION_COMBAT3': {'img': 'promo_combat3.gif', 'value': {'iCombatPercent': 10}},
	'PROMOTION_COMBAT4': {'img': 'promo_combat4.gif', 'value': {'iCombatPercent': 10}},
	'PROMOTION_COMBAT5': {'img': 'promo_combat5.gif', 'value': {'iCombatPercent': 10}},
	'PROMOTION_COMBAT6': {'img': 'promo_combat6.gif', 'value': {'iCombatPercent': 25}},
	'PROMOTION_COVER': {'img': 'promo_cover.gif', 'value': {'UNITCOMBAT_ARCHER': 25}},
	'PROMOTION_SHOCK': {'img': 'promo_shock.gif', 'value': {'UNITCOMBAT_MELEE': 25}},
	'PROMOTION_PINCH': {'img': 'promo_pinch.gif', 'value': {'UNITCOMBAT_GUN': 25}},
	'PROMOTION_FORMATION': {'img': 'promo_formation.gif', 'value': {'UNITCOMBAT_MOUNTED': 25}},
	'PROMOTION_CHARGE': {'img': 'promo_charge.gif', 'value': {'UNITCOMBAT_SIEGE': 25}},
	'PROMOTION_AMBUSH': {'img': 'promo_ambush.gif', 'value': {'UNITCOMBAT_ARMOR': 25}},
	'PROMOTION_AMPHIBIOUS': {'img': 'promo_amphibious.gif', 'value': {'bRiver': 1, 'bAmphib': 1}},
	'PROMOTION_MARCH': {'img': 'promo_march.gif', 'value': {'bAlwaysHeal': 1}},
	'PROMOTION_BLITZ': {'img': 'promo_blitz.gif', 'value': {'bBlitz': 1}},
	'PROMOTION_COMMANDO': {'img': 'promo_commando.gif', 'value': {'bEnemyRoute': 1}},
	'PROMOTION_MEDIC1': {'img': 'promo_medic1.gif', 'value': {'iSameTileHealChange': 10}},
	'PROMOTION_MEDIC2': {'img': 'promo_medic2.gif', 'value': {'iAdjacentTileHealChange': 10}},
	'PROMOTION_MEDIC3': {'img': 'promo_medic3.gif', 'value': {'iSameTileHealChange': 15, 'iAdjacentTileHealChange': 15}},
	'PROMOTION_GUERILLA1': {'img': 'promo_guerilla1.gif', 'value': {'iHillsDefense': 20}},
	'PROMOTION_GUERILLA2': {'img': 'promo_guerilla2.gif', 'value': {'iHillsDefense': 30, 'bHillsDoubleMove': 1}},
	'PROMOTION_GUERILLA3': {'img': 'promo_guerilla3.gif', 'value': {'iWithdrawalChange': 50, 'iHillsAttack': 25}},
	'PROMOTION_WOODSMAN1': {'img': 'promo_woodsman1.gif', 'value': {'iForestsDefense': 20, 'iJunglesDefense': 20}},
	'PROMOTION_WOODSMAN2': {'img': 'promo_woodsman2.gif', 'value': {'iForestsDefense': 30, 'iJunglesDefense': 30, 'bForestsDoubleMoves': 1, 'bJunglesDoubleMove': 1}},
	'PROMOTION_WOODSMAN3': {'img': 'promo_woodsman3.gif', 'value': {'iFirstStrikesChange': 2, 'iSameTileHealChange': 15, 'iForestsAttack': 50, 'iJunglesAttack': 50}},
	'PROMOTION_CITY_RAIDER1': {'img': 'promo_cr1.gif', 'value': {'iCityAttack': 20}},
	'PROMOTION_CITY_RAIDER2': {'img': 'promo_cr2.gif', 'value': {'iCityAttack': 25}},
	'PROMOTION_CITY_RAIDER3': {'img': 'promo_cr3.gif', 'value': {'iCityAttack': 30, 'UNITCOMBAT_GUN': 10}},
	'PROMOTION_CITY_GARRISON1': {'img': 'promo_cg1.gif', 'value': {'iCityDefense': 20}},
	'PROMOTION_CITY_GARRISON2': {'img': 'promo_cg2.gif', 'value': {'iCityDefense': 25}},
	'PROMOTION_CITY_GARRISON3': {'img': 'promo_cg3.gif', 'value': {'iCityDefense': 30, 'UNITCOMBAT_MELEE': 10}},
	'PROMOTION_DRILL1': {'img': 'promo_drill1.gif', 'value': {'iChanceFirstStrikesChange': 1}},
	'PROMOTION_DRILL2': {'img': 'promo_drill2.gif', 'value': {'iFirstStrikesChange': 1, 'iCollateralDamagePercentReduction': 20}},
	'PROMOTION_DRILL3': {'img': 'promo_drill3.gif', 'value': {'iChanceFirstStrikesChange': 2, 'iCollateralDamagePercentReduction': 20}},
	'PROMOTION_DRILL4': {'img': 'promo_drill4.gif', 'value': {'iFirstStrikesChange': 2, 'iCollateralDamagePercentReduction': 20, 'UNITCOMBAT_MOUNTED': 10}},
	'PROMOTION_BARRAGE1': {'img': 'promo_barrage1.gif', 'value': {'iCollateralDamageChange': 20}},
	'PROMOTION_BARRAGE2': {'img': 'promo_barrage2.gif', 'value': {'iCollateralDamageChange': 30, 'UNITCOMBAT_MELEE': 10}},
	'PROMOTION_BARRAGE3': {'img': 'promo_barrage3.gif', 'value': {'iCollateralDamageChange': 50, 'UNITCOMBAT_GUN': 10}},
	'PROMOTION_ACCURACY': {'img': 'promo_accuracy.gif', 'value': {'iBombardRateChange': 8}},
	'PROMOTION_FLANKING1': {'img': 'promo_flanking1.gif', 'value': {'iWithdrawalChange': 10}},
	'PROMOTION_FLANKING2': {'img': 'promo_flanking2.gif', 'value': {'bImmuneToFirstStrikes': 1, 'iWithdrawalChange': 20}},
	'PROMOTION_SENTRY': {'img': 'promo_sentry.gif', 'value': {'iVisibilityChange': 1}},
	'PROMOTION_MOBILITY': {'img': 'promo_mobility.gif', 'value': {'iMoveDiscountChange': 1}},
	'PROMOTION_NAVIGATION1': {'img': 'promo_navigation1.gif', 'value': {'iMovesChange': 1}},
	'PROMOTION_NAVIGATION2': {'img': 'promo_navigation2.gif', 'value': {'iMovesChange': 1}},
	'PROMOTION_LEADER': {'img': null, 'value': {'bLeader': 1}},
	'PROMOTION_LEADERSHIP': {'img': 'promo_leadership.gif', 'value': {'iExperiencePercent': 100}},
	'PROMOTION_TACTICS': {'img': 'promo_tactics.gif', 'value': {'iWithdrawalChange': 30}},
	'PROMOTION_MORALE': {'img': 'promo_morale.gif', 'value': {'iMovesChange': 1}},
	'PROMOTION_RANGE1': {'img': 'promo_range1.gif', 'value': {'iAirRangeChange': 1}},
	'PROMOTION_RANGE2': {'img': 'promo_range2.gif', 'value': {'iAirRangeChange': 1}},
	'PROMOTION_INTERCEPTION1': {'img': 'promo_interception1.gif', 'value': {'iInterceptChange': 10}},
	'PROMOTION_INTERCEPTION2': {'img': 'promo_interception2.gif', 'value': {'iInterceptChange': 20}},
	'PROMOTION_ACE': {'img': 'promo_ace.gif', 'value': {'iEvasionChange': 25}}
}

//civunit object
function CivUnit($xml_entry) {
	
	// OBJECT FUNCTIONS
	// combat modifier total
	this.getCombatModifier = function() {
		var combat_mod_total = 0;
		// iterate through all registered promotions
		jQuery.each(this.promotions, function(idx, val) {
			// check promotion dictionary for all values for promotion
			jQuery.each(promotion_master_dictionary[val]['value'], function(i, v) {
				if (i == 'iCombatPercent') {
					combat_mod_total += v;
				}
			});
		});
		
		return combat_mod_total;
	};
	
	
	
	// OBJECT PARAMETERS

	this.hp = 100;
	this.xp = 0;

	// VALUES TO TAKE FROM XML FILE
	this.unitName = $xml_entry.find("Type").text();
	this.unitClass = $xml_entry.find("Class").text();
	this.combat = $xml_entry.find("Combat").text();
	this.domain = $xml_entry.find("Domain").text();
	this.bFirstStrikeImmune = $xml_entry.find("bFirstStrikeImmune").text();
	this.bNoDefensiveBonus = parseInt($xml_entry.find("bNoDefensiveBonus").text());
	this.bIgnoreBuildingDefense = $xml_entry.find("bIgnoreBuildingDefense").text();
	this.bNukeImmune = $xml_entry.find("bNukeImmune").text();
	this.flankingStrikes = {};                                               				//TODO
 	this.iCost = parseInt($xml_entry.find("iCost").text());
	this.iCombat = parseInt($xml_entry.find("iCombat").text());
	this.iAirCombat = $xml_entry.find("iAirCombat").text();
	this.iFirstStrikes = parseInt($xml_entry.find("iFirstStrikes").text());
	this.iChanceFirstStrikes = parseInt($xml_entry.find("iChanceFirstStrikes").text());
	this.iInterceptionProbability = $xml_entry.find("iInterceptionProbability").text();
	this.iEvasionProbability = $xml_entry.find("iEvasionProbability").text();
	this.iWithdrawalProb = parseInt($xml_entry.find("iWithdrawalProb").text());
	this.iCollateralDamage = $xml_entry.find("iCollateralDamage").text();
	this.iCollateralDamageLimit = $xml_entry.find("iCollateralDamageLimit").text();
	this.iCollateralDamageMaxUnits = $xml_entry.find("iCollateralDamageMaxUnits").text();
	this.iCityAttack = parseInt($xml_entry.find("iCityAttack").text());
	this.iCityDefense = parseInt($xml_entry.find("iCityDefense").text());
	this.iAnimalCombat = parseInt($xml_entry.find("iAnimalCombat").text());
	this.iHillsAttack = parseInt($xml_entry.find("iHillsAttack").text());
	this.iHillsDefense = parseInt($xml_entry.find("iHillsDefense").text());
	
	// set combat class specific mods
	this.unitCombatAtkMods = new Array();
	this.unitCombatDfnMods = new Array();
	this.unitCombatMods = new Array();
	var atk_mods = [];
	var dfn_mods = [];
	var combat_mods = [];
	$xml_entry.find("UnitClassAttackMods").find("UnitClassAttackMod").each(function() {
		var this_mod = [];
		this_mod_key = $(this).find("UnitClassType").text();
		atk_mods[this_mod_key] = parseInt($(this).find("iUnitClassMod").text());
	});
	$xml_entry.find("UnitClassDefenseMods").find("UnitClassDefenseMod").each(function() {
		var this_mod = [];
		this_mod_key = $(this).find("UnitClassType").text();
		dfn_mods[this_mod_key] = parseInt($(this).find("iUnitClassMod").text());
	});
	$xml_entry.find("UnitCombatMods").find("UnitCombatMod").each(function() {
		var this_mod = [];
		this_mod_key = $(this).find("UnitCombatType").text();
		combat_mods[this_mod_key] = parseInt($(this).find("iUnitCombatMod").text());
	});
	this.unitCombatAtkMods = atk_mods;
	this.unitCombatDfnMods = dfn_mods;
	this.unitCombatMods = combat_mods;
	
	// set initial promotions
	this.promotions = [];
	var promos = [];
	$xml_entry.find("FreePromotions").find("FreePromotion").each(function(){
		promos.push($(this).find("PromotionType").text());
	});
	this.promotions = promos;
}

/*
 * DOCUMENT READY FUNCTION
 */
$(document).ready(function() {
	
	// initialize blank chart
	chartjsDisplay = new Chart($("#resultChart"), {
		type: 'bar',
		data: {
			labels: ["Attacker", "Defender"],
			datasets: []
		},
	});
	
	$( '#cultural-defense-entry' ).hide();
	
	// event handler for when attacking unit's HP is changed
	$( '#attacker-hp-entry' ).on('input', function() {
		console.log("entering handler for attacking unit HP change");
		attacking_unit.hp = parseInt($( '#attacker-hp-entry' ).val());
		updateAttackerUI();
	});
	
	// event handler for when attacking unit's HP is changed
	$( '#defender-hp-entry' ).on('input', function() {
		console.log("entering handler for defending unit HP change");
		defending_unit.hp = parseInt($( '#defender-hp-entry' ).val());
		updateDefenderUI();
	});
	
	// event handler for updating city cultural defense
	$( '#terrain-cultural-defense' ).on('input', function() {
		console.log("entering handler for updating city defense");
		if (defending_unit.bNoDefensiveBonus == 0) {
			updateDefenderUI();
		}
	});
	
	// event handler for updating unit fortification
	$( '#terrain-foritify-defense' ).on('input', function() {
		console.log("entering handler for updating fortification defense");
		if (defending_unit.bNoDefensiveBonus == 0) {
			updateDefenderUI();
		}
	});
	
	
	// event handler for selecting Forest Terrain
	$( '#terrain-forest' ).change(function() {
		if (document.getElementById('terrain-forest').checked) {
			console.log('forest is checked');
			$( '#terrain-city' ).prop('checked', false);
			$( '#cultural-defense-entry' ).hide();
		} else {
			console.log('forest is unchecked');
		}
		updateDefenderUI();
	});
	
	// event handler for selecting Hill Terrain
	$( '#terrain-hills' ).change(function() {
		if (document.getElementById('terrain-hills').checked) {
			console.log('hills is checked');
		} else {
			console.log('hills is unchecked');
		}
		updateDefenderUI();
	});
	
	// event handler for selecting Fort Terrain
	$( '#terrain-fort' ).change(function() {
		if (document.getElementById('terrain-fort').checked) {
			console.log('fort is checked');
			$( '#terrain-city' ).prop('checked', false);
			$( '#cultural-defense-entry' ).hide();
		} else {
			console.log('fort is unchecked');
		}
		updateDefenderUI();
	});
	
	// event handler for selecting City Terrain
	$( '#terrain-city' ).change(function() {
		if (document.getElementById('terrain-city').checked) {
			$( '#terrain-fort' ).prop('checked', false);
			$( '#terrain-forest' ).prop('checked', false);
			$( '#cultural-defense-entry' ).show();
			console.log('city is checked');
		} else {
			$( '#cultural-defense-entry' ).hide();
			console.log('city is unchecked');
		}
		updateDefenderUI();
	});
		
	// event handler for selecting River Crossing Terrain
	$( '#terrain-river' ).change(function() {
		if (document.getElementById('terrain-river').checked) {
			console.log('river crossing is checked');
		} else {
			console.log('river crossing is unchecked');
		}
		updateDefenderUI();
	});
		
	// event handler for selecting Amphibious Assault Terrain
	$( '#terrain-amphib' ).change(function() {
		if (document.getElementById('terrain-amphib').checked) {
			console.log('amphibious attack is checked');
		} else {
			console.log('amphibious attack is unchecked');
		}
		updateDefenderUI();
	});	
	
	//read civ4 xml file for unit information
	$.ajax({
		type: "POST",
		url: "src/CIV4UnitInfos.xml",
		dataType: "xml",
		success: function(xml) {
			
			// load xml values into memory
			$(xml).find("UnitInfo").each(function() {
				var unitName = $(this).find("Type").text();
				unitName = unitName.substring(5);
				
				// add xml string to data dictionary
				xml_data_dictionary[unitName] = $(this);
				
				var unitClass = $(this).find("Domain").text();
				unit_name_listing.push(unitName);
			});
			
			// set unit selection 
			$(".unis").autocomplete({
				source: unit_name_listing
			});
			
		}
	});
	
	// attach unit names to autocomplete
	$(".unis").autocomplete({
		select: function(e, ui) {
			console.log(ui.item);
			//$(this).parent().siblings(".power-display").attr("id");
			var side = $(this).parent().parent().attr("id");
			if (side == "attacker") {
				//update attacker unit with xml values
				attacking_unit = xml_data_dictionary[ui.item.label];
				attacking_unit = new CivUnit(xml_data_dictionary[ui.item.label]);
				attacking_unit.hp = parseInt($( '#attacker-hp-entry' ).val());
				console.log(attacking_unit);
				
				//update UI
				updateAttackerUI();
				if (defending_unit != undefined)
					updateDefenderUI();
			}
			else if (side == "defender") {

				//update defender unit with xml values
				defending_unit = xml_data_dictionary[ui.item.label];
				defending_unit = new CivUnit(xml_data_dictionary[ui.item.label]);
				defending_unit.hp = parseInt($( '#defender-hp-entry' ).val());
				console.log(defending_unit);
				
				//update UI
				updateDefenderUI();
			}
			else {
				alert("Error! " + side + " is not a valid side");
			}
		}
	});
	
	// TODO: load promotion information from xml file?
	
});


function updateAttackerUI() {
	console.log('entering updateAttackerUI()');
	
	var $power_table = $('#attacker-power-table');
	var $power_table_base = $('#attacker-power-table-base');
	// update promotion display
	updateAttackerPromotionUI();
	
	var combat_perc_total = 0;
	var first_strikes = attacking_unit.iFirstStrikes;
	var fs_chances = attacking_unit.iChanceFirstStrikes;
	var withdrawal_chance = attacking_unit.iWithdrawalProb;
	
	// iterate through all registered promotions
	jQuery.each(attacking_unit.promotions, function(idx, val) {
		console.log(promotion_master_dictionary[val]['value']);
		// check promotion dictionary for all values for promotion
		jQuery.each(promotion_master_dictionary[val]['value'], function(i, v) {
			// first strikes
			if (i == 'iFirstStrikesChange') {
				first_strikes += v;
			}
			else if (i == 'iChanceFirstStrikesChange') {
				fs_chances += v;
			}
			// withdrawal
			else if (i == 'iWithdrawalChange') {
				withdrawal_chance += v;
			}
		});
	});
	
	// update main strength values
	$('#attackerpower').text(getAttackerTotalPower().toFixed(2));
	
	// DISPLAY NUMBER OF FIRST STRIKES
	if ((first_strikes > 0) || (fs_chances > 0)) {
		var textString = first_strikes + "";
		if (fs_chances > 0) {
			textString += " to " + (first_strikes + fs_chances);
		}
		textString += " First Strike";
		if ((first_strikes != 1) || (fs_chances > 0))
			textString += "s";
		$( '#attacker-first-strikes' ).text(textString);
		console.log(textString);
		$('#attackerpower').append('<div class="fs-display">' + textString + '</div>');
	}
	
	// DISPLAY WITHDRAWAL CHANCE
	if (withdrawal_chance > 0) {
		$('#attackerpower').append('<div class="fs-display">' + withdrawal_chance + '% Chance To Withdrawal</div>');
	}
	
	// update detailed strength view
	
	// if descriptor table exists destroy it
	//$('#attacker-descriptor-table').remove();
	
	// create table
	$('#attackerpower').append('<table><tbody id="atk-tbl-body" class="power-breakdown"></tbody></table>');
	$('#atk-tbl-body').attr('font-size', '12px');
	
	// base strength
	$('#atk-tbl-body').append('<tr id="atk-tbl-base-strength"></tr>');
	$('#atk-tbl-base-strength').append('<td>' + attacking_unit.iCombat.toFixed(2) + '</td>');
	$('#atk-tbl-base-strength').append('<td>Unit Base Strength</td>');
	
	// combat promotions
	if (combat_perc_total > 0) {
		$('#atk-tbl-body').append('<tr id="atk-tbl-combat-promos"></tr>');
		$('#atk-tbl-combat-promos').append('<td>+ ' + combat_perc_total + '%</td>');
		$('#atk-tbl-combat-promos').append('<td>Combat Promotions</td>');
	}
	
	// hp
	display_hp = attacking_unit.hp / 100
	if (display_hp < 1) {
		$('#atk-tbl-body').append('<tr id="atk-tbl-hp"></tr>');
		$('#atk-tbl-hp').append('<td>x ' + display_hp.toFixed(2) + '%</td>');
		$('#atk-tbl-hp').append('<td>HP</td>');		
	}

	
		
	
}
	

function updateDefenderUI() {
	console.log('entering updateDefenderUI()');
	// update promotion display
	updateDefenderPromotionUI();
	
	// calculate terrain defensive bonusess
	var total_terrain_bonus = 0;
	var total_defensive_bonus = 0;
	var dfn_terrain_forest = 0;
	var dfn_terrain_hills = 0;
	var dfn_terrain_fort = 0;
	var dfn_terrain_city_culture = 0;
	var dfn_amphib_attack = 0;
	var dfn_river_crossing = 0;
	var dfn_fortification_bonus = 0;
	var dfn_city_defense = 0;
	
	// terrain, city, and fort bonus
	if (parseInt(defending_unit.bNoDefensiveBonus) == 0) {
		if (document.getElementById('terrain-forest').checked) {
			dfn_terrain_forest = 50;
		}
		
		if (document.getElementById('terrain-hills').checked) {
			dfn_terrain_hills = 25;
		}
		
		if (document.getElementById('terrain-fort').checked) {
			dfn_terrain_fort = 25;
			dfn_city_defense = parseInt(defending_unit.iCityDefense);
			if (attacking_unit != undefined) {
				dfn_city_defense -= parseInt(attacking_unit.iCityAttack);
			}
		}
		
		if (document.getElementById('terrain-city').checked) {
			dfn_terrain_city_culture = parseInt($('#terrain-cultural-defense').val());
			dfn_city_defense = parseInt(defending_unit.iCityDefense);
			if (attacking_unit != undefined) {
				dfn_city_defense -= parseInt(attacking_unit.iCityAttack);
			}
		}
		
		dfn_city_defense = dfn_city_defense + dfn_terrain_fort + dfn_terrain_city_culture;
		
		dfn_fortification_bonus = parseInt($( '#terrain-foritify-defense' ).val());
	}

	
	

	
	// attacker maluses
	if (document.getElementById('terrain-amphib').checked) {
		dfn_amphib_attack = 50;
	}
		
	if (document.getElementById('terrain-river').checked) {
		dfn_river_crossing = 25;
	}

	
	// iterate through defender combat mods
	var vs_class_mod = 0;
	var vs_unit_mod = 0;
	
	// add unit class innate bonuses (i.e. axemen get +50% vs melee class units; phalanxes get +100% vs chariot units)
	if (attacking_unit != undefined) {
		if (defending_unit.unitCombatMods[attacking_unit.combat] != undefined) 
			vs_class_mod += defending_unit.unitCombatMods[attacking_unit.combat];
		if (attacking_unit.unitCombatMods[defending_unit.combat] != undefined)
			vs_class_mod -= attacking_unit.unitCombatMods[defending_unit.combat];
		if (defending_unit.unitCombatDfnMods[attacking_unit.unitClass] != undefined)
			vs_unit_mod += defending_unit.unitCombatDfnMods[attacking_unit.unitClass];
		if (attacking_unit.unitCombatAtkMods[defending_unit.unitClass] != undefined)
			vs_unit_mod -= attacking_unit.unitCombatAtkMods[defending_unit.unitClass];
	}
	
	// var for combat and first strikes
	var combat_perc_total = 0;
	var first_strikes = defending_unit.iFirstStrikes;
	var fs_chances = defending_unit.iChanceFirstStrikes;
	
	// DEFENDING UNIT'S PROMOTIONS
	// iterate through all registered promotions
	jQuery.each(defending_unit.promotions, function(idx, val) {
		// check promotion dictionary for all values for promotion
		jQuery.each(promotion_master_dictionary[val]['value'], function(i, v) {
			// combat
			if (i == 'iCombatPercent') {
				combat_perc_total += v;
			}
			
			// first strikes
			else if (i == 'iFirstStrikesChange') {
				first_strikes += v;
			}
			else if (i == 'iChanceFirstStrikesChange') {
				fs_chances += v;
			}
			
			// defensive promotion bonuses
			if (parseInt(defending_unit.bNoDefensiveBonus) == 0) {
				// terrain promotions
				if ((i == 'iHillsDefense') && (document.getElementById('terrain-hills').checked)) {
					dfn_terrain_hills += v;
				}
				else if ((i == 'iForestsDefense') && (document.getElementById('terrain-forest').checked)) {
					dfn_terrain_forest += v;
				}
				
				// city garrison
				else if ((i == 'iCityDefense') && ((document.getElementById('terrain-city').checked) || (document.getElementById('terrain-fort').checked))) {
					dfn_city_defense += v;
				}
			}

			// vs class modifiers
			if (attacking_unit != undefined) {
				if (i == attacking_unit.combat) {
					vs_class_mod += v;
				}
			}
			
		});
	});
	
	// ATTACKING UNIT'S PROMOTIONS
	if (attacking_unit != undefined) {
		jQuery.each(attacking_unit.promotions, function(idx, val) {
			// check promotion dictionary for all values for promotion
			jQuery.each(promotion_master_dictionary[val]['value'], function(i, v) {
				
				// terrain promotions
				if ((i == 'iHillsAttack') && (document.getElementById('terrain-hills').checked)) {
					dfn_terrain_hills -= v;
				}
				else if ((i == 'iForestsAttack') && (document.getElementById('terrain-forest').checked)) {
					dfn_terrain_forest -= v;
				}
				
				// city raider
				else if ((i == 'iCityAttack') && ((document.getElementById('terrain-city').checked) || (document.getElementById('terrain-fort').checked))) {
					dfn_city_defense -= v;
				}
				
				// vs class modifiers
				else if (i == defending_unit.combat) {
					vs_class_mod -= v;
				}
				
				// amphibious
				else if (i == 'bRiver') {
					if (v == 1) {
						dfn_river_crossing = 0;
					}
				}
				
				else if (i == 'bAmphib') {
					if (v == 1) {
						dfn_amphib_attack = 0;
					}
				}
				
			});
		});
	}
	
	// calculate total terrain bonus
	total_defensive_bonus = dfn_terrain_forest +
						    dfn_terrain_hills +
						    dfn_city_defense +
						    dfn_amphib_attack +
						    dfn_river_crossing +
						    dfn_fortification_bonus;

	// calculate total defensive strength bonus
	defender_strength_mod = (combat_perc_total / 100) +
							(total_defensive_bonus / 100) +
							(vs_class_mod / 100) +
							(vs_unit_mod / 100);
	
	// update strength values
	var base_strength = parseFloat(defending_unit.iCombat);
	var unit_hp = defending_unit.hp;
	if (defender_strength_mod >= 0)
		final_strength = base_strength * (1 + defender_strength_mod);
	else
		final_strength = base_strength / (1 - defender_strength_mod);
	final_strength = final_strength * unit_hp / 100;
	$('#defenderpower').text(final_strength.toFixed(2));
	
		
	// DISPLAY NUMBER OF FIRST STRIKES
	if ((first_strikes > 0) || (fs_chances > 0)) {
		var textString = first_strikes + "";
		if (fs_chances > 0) {
			textString += " to " + (first_strikes + fs_chances);
		}
		textString += " First Strike";
		if ((first_strikes != 1) || (fs_chances > 0))
			textString += "s";
		$( '#defender-first-strikes' ).text(textString);
		console.log(textString);
		$('#defenderpower').append('<div class="fs-display">' + textString + '</div>');
	}

	
	// update detailed strength view
	
	// if descriptor table exists destroy it
	$('#defender-descriptor-table').remove();
	
	// create table
	$('#defenderpower').append('<table><tbody id="dfn-tbl-body" class="power-breakdown"></tbody></table>');
	$('#dfn-tbl-body').attr('font-size', '12px');
	
	// base strength
	$('#dfn-tbl-body').append('<tr id="dfn-tbl-base-strength"></tr>');
	$('#dfn-tbl-base-strength').append('<td>' + base_strength.toFixed(2) + '</td>');
	$('#dfn-tbl-base-strength').append('<td>Unit Base Strength</td>');
	
	// combat promotions
	if (combat_perc_total > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-combat-promos"></tr>');
		$('#dfn-tbl-combat-promos').append('<td>+ ' + combat_perc_total + '%</td>');
		$('#dfn-tbl-combat-promos').append('<td>Combat Promotions</td>');
	}
	
	// defensive bonusess
	if (dfn_terrain_forest > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-terrain-forest"></tr>');
		$('#dfn-tbl-terrain-forest').append('<td>+ ' + dfn_terrain_forest + '%</td>');
		$('#dfn-tbl-terrain-forest').append('<td>Defensive Terrain: Forest</td>');
	}
	
	if (dfn_terrain_hills > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-terrain-hills"></tr>');
		$('#dfn-tbl-terrain-hills').append('<td>+ ' + dfn_terrain_hills + '%</td>');
		$('#dfn-tbl-terrain-hills').append('<td>Defensive Terrain: Hills</td>');
	}

	if (dfn_city_defense > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-terrain-city-culture"></tr>');
		$('#dfn-tbl-terrain-city-culture').append('<td>' + dfn_city_defense + '%</td>');
		$('#dfn-tbl-terrain-city-culture').append('<td>City/Fort Defense</td>');	
	}
	
	if (dfn_amphib_attack > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-terrain-amphib-atk"></tr>');
		$('#dfn-tbl-terrain-amphib-atk').append('<td>+ ' + dfn_amphib_attack + '%</td>');
		$('#dfn-tbl-terrain-amphib-atk').append('<td>Amphibious Attack</td>');
	}
	
	if (dfn_river_crossing > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-terrain-river-crossing"></tr>');
		$('#dfn-tbl-terrain-river-crossing').append('<td>+ ' + dfn_river_crossing + '%</td>');
		$('#dfn-tbl-terrain-river-crossing').append('<td>Attacker Crossing River</td>');
	}
	
	if (dfn_fortification_bonus > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-terrain-fortification"></tr>');
		$('#dfn-tbl-terrain-fortification').append('<td>+ ' + dfn_fortification_bonus + '%</td>');
		$('#dfn-tbl-terrain-fortification').append('<td>Fortification Bonus</td>');
	}
	
	// display vs unit class mods
	if (vs_class_mod > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-combatmods-defender"></tr>');
		$('#dfn-tbl-combatmods-defender').append('<td>+ ' + vs_class_mod + '%</td>');
		$('#dfn-tbl-combatmods-defender').append('<td>Defending Unit bonus vs ' + attacking_unit.combat + '</td>');
	}
	
	if (vs_class_mod < 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-combatmods-attacker"></tr>');
		$('#dfn-tbl-combatmods-attacker').append('<td>' + vs_class_mod + '%</td>');
		$('#dfn-tbl-combatmods-attacker').append('<td>Attacking Unit bonus vs ' + defending_unit.combat + '</td>');
	}
	
	// display vs unit mods
	if (vs_unit_mod > 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-unitmods-defender"></tr>');
		$('#dfn-tbl-unitmods-defender').append('<td>+ ' + vs_unit_mod + '%</td>');
		$('#dfn-tbl-unitmods-defender').append('<td>Defending Unit bonus vs ' + attacking_unit.unitClass + '</td>');
	}
	
	if (vs_unit_mod < 0) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-unitmods-attacker"></tr>');
		$('#dfn-tbl-unitmods-attacker').append('<td>' + vs_unit_mod + '%</td>');
		$('#dfn-tbl-unitmods-attacker').append('<td>Defending Unit bonus vs ' + defending_unit.unitClass + '</td>');
	}
	
	// hp
	display_hp = unit_hp / 100
	if (display_hp < 1) {
		$('#dfn-tbl-body').append('<tr id="dfn-tbl-hp"></tr>');
		$('#dfn-tbl-hp').append('<td>x ' + display_hp.toFixed(2) + '%</td>');
		$('#dfn-tbl-hp').append('<td>HP</td>');		
	}

	
}

function updateAttackerPromotionUI() {
	// clear all highlighted promotions
	$("#attackerpromotions").children().each(function() {
		$(this).css("background-color", "black");
	});
	
	// highlight promotions that are set
	jQuery.each(attacking_unit.promotions, function(idx, val) {
		var promo_button_id = "#attacker-promo-" + val.substr(10).toLowerCase().replace(/_/g, "");
		$( promo_button_id ).css("background-color", "red");
	});
}

function updateDefenderPromotionUI() {
	// clear all highlighted promotions
	$("#defenderpromotions").children().each(function() {
		$(this).css("background-color", "black");
	});
	
	// highlight promotions that are set
	jQuery.each(defending_unit.promotions, function(idx, val) {
		var promo_button_id = "#defender-promo-" + val.substr(10).toLowerCase().replace(/_/g, "");
		$( promo_button_id ).css("background-color", "red");
	});
}

function selectAttackerPromo(promotion) {
	console.log("Entering selectAttackerPromo(" + promotion + ")");
	// check if unit has been selected first
	if (attacking_unit == undefined) {
		alert('Select a unit first', 'Error!');
		return;
	}
	
	// promotion variable will be exact key name for promotion_master_dictionary
	// massage string to get ID of the div where the image is kept
	var selected_id = "#attacker-promo-" + promotion.substr(10).toLowerCase().replace(/_/g, "");
	
	// check if promotion is already set in unit's promotion array
	var index_of = jQuery.inArray(promotion, attacking_unit.promotions);
	
	// use css to show background as highlighted or unhighlighted
	if (index_of > -1) {
		// remove from promotion array and unhighlight image
		attacking_unit.promotions.splice(index_of, 1);
		$( selected_id ).css("background-color", "black");
	} else {
		// add to promotion array and highlight image
		attacking_unit.promotions.push(promotion);
		$( selected_id ).css("background-color", "red");
	}
	
	// update UI for attacker and defender units
	updateAttackerUI();
	if (defending_unit != undefined)
		updateDefenderUI();

}

function selectDefenderPromo(promotion) {
	console.log("Entering selectDefenderPromo(" + promotion + ")");
	// check if unit has been selected first
	if (defending_unit == undefined) {
		alert('Select a unit first', 'Error!');
		return;
	}
	
	// promotion variable will be exact key name for promotion_master_dictionary
	// massage string to get ID of the div where the image is kept
	var selected_id = "#defender-promo-" + promotion.substr(10).toLowerCase().replace(/_/g, "");
	
	var index_of = jQuery.inArray(promotion, defending_unit.promotions);
	if (index_of > -1) {
		defending_unit.promotions.splice(index_of, 1);
		$( selected_id ).css("background-color", "black");
	} else {
		defending_unit.promotions.push(promotion);
		$( selected_id ).css("background-color", "red");
	}
	
	//console.log(defending_unit.promotions);
	updateDefenderUI();
}


// GET POWER FUNCTIONS
function getAttackerTotalPower() {
	
	var iPower;
	
	// get attacker strength * combat promotions * hp
	iPower = attacking_unit.iCombat;
	iPower *= (1 + (attacking_unit.getCombatModifier() / 100))
	iPower *= (attacking_unit.hp / 100);
	
	return iPower;
}

/**
 * Function calculate's defending unit's strength based off of promotions and unit base stats
*/

function getDefenderTotalPower() {
	
	var iPower;
	var combatModifiers = 0;
	var modifiers = 0;
	
	console.log("Testing getDefenderTotalPower()");
	
	// get defender strength
	iPower = defending_unit.iCombat;
	
	console.log("defender base power: " + iPower);
	
	// get defender combat promotions
	combatModifiers = defending_unit.getCombatModifier();
	
	console.log("defender strength after combat modifiers: " + combatModifiers);
	
	// get defender terrain bonus
	modifiers += getDefenderTerrainBonus();
	
	console.log("additional modifiers after defender terrain bonus: " + (modifiers / 100));
	
	// get attacker terrain bonus
	modifiers += getAttackerTerrainBonus();
	
	console.log("additional modifiers after attacker terrain bonus: " + (modifiers / 100));
	
	// get promotion modifiers
	modifiers += getPromotionModifiers();
	
	console.log("additional modifiers after promotion modifiers: " + (modifiers / 100));
	
	// get defender HP
	
	console.log("HP modifier: " + (defending_unit.hp / 100));
	
	// total modifiers
	
	modifiers += combatModifiers;
	if (modifiers >= 0) {
		iPower *= (1 + (modifiers / 100));
	}
	else {
		iPower = iPower / (1 - (modifiers / 100));
	}
	
	console.log("Power After Modifiers: " + iPower);
	
	iPower *= (defending_unit.hp / 100);
	
	console.log("Power After HP: " + iPower);
	
	return iPower;
}

function getDefenderTerrainBonus() {
	
	var dfn_terrain = 0;
	// terrain, city, and fort bonus
	if (defending_unit.bNoDefensiveBonus == 0) {
		if (document.getElementById('terrain-forest').checked) {
			dfn_terrain += 50;
		}
		
		if (document.getElementById('terrain-hills').checked) {
			dfn_terrain += 25;
		}
		
		if (document.getElementById('terrain-fort').checked) {
			dfn_terrain += 25;
			dfn_terrain += defending_unit.iCityDefense;
		}
		
		if (document.getElementById('terrain-city').checked) {
			dfn_terrain += parseInt($('#terrain-cultural-defense').val());
			dfn_terrain += defending_unit.iCityDefense;
		}
		
		dfn_terrain += parseInt($( '#terrain-foritify-defense' ).val());
	}
	
	
	
	return dfn_terrain;
}

function getAttackerTerrainBonus() {
	
	var atk_terrain_malus = 0;
	
	// attacker maluses for amphibious or river crossing
	if (attacking_unit != undefined) {
		if (jQuery.inArray("PROMOTION_AMPHIBIOUS", attacking_unit.promotions) < 0) {
			if (document.getElementById('terrain-amphib').checked) {
				atk_terrain_malus += 50;
			}
		
			if (document.getElementById('terrain-river').checked) {
				atk_terrain_malus += 25;
			}
		}
	}

	return atk_terrain_malus;
}

function getPromotionModifiers() {
	
	var def_power_mod = 0;
	
	// terrain promotions
	
	// DEFENDER PROMOTIONS
	// iterate through all registered promotions
	jQuery.each(defending_unit.promotions, function(idx, val) {
		// check promotion dictionary for all values for promotion
		jQuery.each(promotion_master_dictionary[val]['value'], function(i, v) {
			
			// defensive promotion bonuses
			if (parseInt(defending_unit.bNoDefensiveBonus) == 0) {
				// terrain promotions
				if ((i == 'iHillsDefense') && (document.getElementById('terrain-hills').checked)) {
					def_power_mod += v;
				}
				else if ((i == 'iForestsDefense') && (document.getElementById('terrain-forest').checked)) {
					def_power_mod += v;
				}
				
				// city garrison
				else if ((i == 'iCityDefense') && ((document.getElementById('terrain-city').checked) || (document.getElementById('terrain-fort').checked))) {
					def_power_mod += v;
				}
			}

			// vs class modifiers
			if (attacking_unit != undefined) {
				if (i == attacking_unit.combat) {
					def_power_mod += v;
				}
			}
			
		});
	});
	
	
	// ATTACKING UNIT'S PROMOTIONS
	if (attacking_unit != undefined) {
		jQuery.each(attacking_unit.promotions, function(idx, val) {
			// check promotion dictionary for all values for promotion
			jQuery.each(promotion_master_dictionary[val]['value'], function(i, v) {
				
				// terrain promotions
				if ((i == 'iHillsAttack') && (document.getElementById('terrain-hills').checked)) {
					def_power_mod -= v;
				}
				else if ((i == 'iForestsAttack') && (document.getElementById('terrain-forest').checked)) {
					def_power_mod -= v;
				}
				
				// city raider
				else if ((i == 'iCityAttack') && ((document.getElementById('terrain-city').checked) || (document.getElementById('terrain-fort').checked))) {
					def_power_mod -= v;
				}
				
				// vs class modifiers
				else if (i == defending_unit.combat) {
					def_power_mod -= v;
				}				
			});
		});
	}
	
	return def_power_mod;
}


// FUNCTIONS FOR CALCULATING DAMAGE DONE IN A SINGLE ROUND OF COMBAT
// attacking unit:
function attackingUnitDamageInSingleRound() {
	var atkUnitStrength, dfnUnitStrength;
	atkUnitStrength = getAttackerTotalPower();
	dfnUnitStrength = getDefenderTotalPower();
	
	return Math.floor(20 * (3 * atkUnitStrength + dfnUnitStrength) / (3 * dfnUnitStrength + atkUnitStrength));
}

// defending unit:
function defendingUnitDamageInSingleRound() {
	var atkUnitStrength, dfnUnitStrength;
	atkUnitStrength = getAttackerTotalPower();
	dfnUnitStrength = getDefenderTotalPower();
	
	return Math.floor(20 * (3 * dfnUnitStrength + atkUnitStrength) / (3 * atkUnitStrength + dfnUnitStrength));
}


// FUNCTIONS FOR CALCULATING ODDS OF A UNIT WINNING X OUT OF Y BATTLES:
function calculateOddsOfWinningBattle() {
	var atkNumHitsUntilDeath, dfnNumHitsUntilDeath;
	var atkOddsToWinSingleRound, dfnOddsToWinSingleRound;
	var maxRounds;
	var resultsArray = [];
	
	// calculate number of hits each unit takes until it dies
	
	atkNumHitsUntilDeath = Math.ceil(attacking_unit.hp / defendingUnitDamageInSingleRound());
	dfnNumHitsUntilDeath = Math.ceil(defending_unit.hp / attackingUnitDamageInSingleRound());
	
	console.log("atkNumHitsUntilDeath: " + atkNumHitsUntilDeath);
	console.log("dfnNumHitsUntilDeath: " + dfnNumHitsUntilDeath);
	
	// calculate odds of winning a single round
	
	atkOddsToWinSingleRound = getAttackerTotalPower() / (getAttackerTotalPower() + getDefenderTotalPower());
	dfnOddsToWinSingleRound = getDefenderTotalPower() / (getAttackerTotalPower() + getDefenderTotalPower());
	
	// calculate maximum number of rounds

	maxRounds = atkNumHitsUntilDeath + dfnNumHitsUntilDeath - 1;
	console.log("maximum rounds: " + maxRounds);
	
	// Attacking Unit has odds of winning each round equal to AtkStrength / AtkStrength + DfnStrength
	// Calculate the odds of attacker getting j number of successful rounds (defender odds are the compliment) over the maximum rounds
	for (var i = 0; i <= maxRounds; i++) {
		resultsArray[i] = binomialCoefficient(maxRounds, i) * Math.pow(atkOddsToWinSingleRound, i) * Math.pow(dfnOddsToWinSingleRound, maxRounds - i);
	}
	
	return resultsArray;
}

function parseCombatResultArray(resultArray) {	
	// results array is given in odds of attacker winning X many rounds against defender
	// A = number of hits required to kill attacking unit
	// D = number of hits required to kill defending unit
	// M = maximum number of rounds in combat
	// index X = chance for attacking unit to get X number hits against defender in M total rounds
	// indexes 0 to A: defender wins combat
	// indexes A+1 to M: attacker wins combat
	
	var A, D, M;
	var idx;
	var totalAttackerOdds = 0.0, totalDefenderOdds = 0.0;
	
	A = Math.ceil(attacking_unit.hp / defendingUnitDamageInSingleRound());
	D = Math.ceil(defending_unit.hp / attackingUnitDamageInSingleRound());
	M = A + D - 1;
	
	for (idx = 0; idx <= A; idx++) {
		totalAttackerOdds += resultArray[idx];
	}
	for (idx = A+1; idx <= M; idx++) {
		totalDefenderOdds += resultArray[idx];
	}
	
	console.log("Attacker odds: " + totalAttackerOdds.toString());
	console.log("Defender odds: " + totalDefenderOdds.toString());
	
}

// binomial coefficient helper function, used for calculating odds
function binomialCoefficient(n, k) {
	return (factorial(n) / (factorial(k) * factorial(n - k)));
}

// factorial helper function
function factorial(n) {
	if (n < 0) {
		return -1; // ERROR
	}
	else if (n == 0) {
		return 1;
	}
	else {
		return (n * factorial(n - 1));
	}
}


//
// CHART.JS FUNCTIONS FOR DISPLAYING RESULTS
//

function createResultChart(resultArray) {
	
	// BEFORE CREATING CHART DO THE FOLLOWING:
	// 1. Create complimentary result array for defense
	// 2. Create options
	var A, D, M;
	var idx;
	var totalAttackerOdds = 0.0, totalDefenderOdds = 0.0;
	var atkResultArray, dfnResultArray;
	var atkLabelString, dfnLabelString;
	
	A = Math.ceil(attacking_unit.hp / defendingUnitDamageInSingleRound());
	D = Math.ceil(defending_unit.hp / attackingUnitDamageInSingleRound());
	M = A + D - 1;
	
	var labelnames = [];
	dfnResultArray = resultArray.slice(0, D).sort(function(a, b) {return b - a;});
	atkResultArray = resultArray.slice(D).sort(function(a, b) {return b - a;});
	console.log(dfnResultArray);
	console.log(atkResultArray);
	
	// build label names for attacker & defender
	var atkTotal = atkResultArray.reduce(add, 0);
	atkTotal = Math.floor(atkTotal * 10000) / 100.00;
	atkLabelString = "Attacker (" + atkTotal.toString() + "\%)";
	
	var dfnTotal = dfnResultArray.reduce(add, 0);
	dfnTotal = Math.floor(dfnTotal * 10000) / 100.00;
	dfnLabelString = "Defender (" + dfnTotal.toString() + "\%)";
	
	// build datasets for data object
	var numDatasets = Math.max(A, D);
	var datasets = [];
	
	for (var i = 0; i < numDatasets; i++) {
		datasets.push({
			backgroundColor: "rgba(255, 99, 132, 0.2)",
			borderColor: "rgba(255, 99, 132, 1)",
			borderWidth: 1,
			hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
			hoverBorderColor: "rgba(255, 99, 132, 1)",
			data: [atkResultArray[i], dfnResultArray[i]]
		});
	}
	
	// build data object for chartjs
	var data = {
		labels: [atkLabelString, dfnLabelString],
		datasets: datasets
	};
	
	// destroy existing chart
	chartjsDisplay.destroy();
	
	// create new chartjs chart based on data
	chartjsDisplay = new Chart($("#resultChart"), {
		type: 'bar',
		data: data,
		options: {
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}
	});
}

// helper function for reduce functionality with arrays
function add(a, b) {
	return a + b;
}