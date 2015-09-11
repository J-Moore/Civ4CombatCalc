var atkUnit;
var dfnUnit;

window.onload = function() {
  addDataListOptions();
};

function addDataListOptions() {
  var units = '';
  for (var i = 0; i < UnitListing.length; i++) {
    units += '<option value="'+UnitListing[i]+'" />';
  }
  
  document.getElementById('unitList').innerHTML = units;
}

function addAtkUnits() {
  var unitTemplate = document.getElementsByName('atkUnitSelect')[0].value;
  //console.log(unitTemplate);
  
  atkUnit = new civUnit();
  atkUnit.setUnitValues(unitTemplate);
  //console.log(atkUnit.unitName);
  
  console.log(atkUnit.promotions);
  
  updateAtkPromoDisplay(atkUnit);
}

function addDfnUnits() {
  var unitTemplate = document.getElementsByName('dfnUnitSelect')[0].value;
  console.log(unitTemplate);
}

function updateAtkPromoDisplay(civ_unit) {
  if (civ_unit.promotions["Accuracy"] == 0) {
    document.getElementsByName('atkPromoAccuracy')[0].checked = false;
  } else {
    document.getElementsByName('atkPromoAccuracy')[0].checked = true;
  }
  
  if (civ_unit.promotions["Drill"] == 0) {
    document.getElementsByName('atkPromoDrill1')[0].checked = false;
    document.getElementsByName('atkPromoDrill2')[0].checked = false;
    document.getElementsByName('atkPromoDrill3')[0].checked = false;
    document.getElementsByName('atkPromoDrill4')[0].checked = false;
  } else if (civ_unit.promotions["Drill"] == 1) {
    document.getElementsByName('atkPromoDrill1')[0].checked = true;
    document.getElementsByName('atkPromoDrill2')[0].checked = false;
    document.getElementsByName('atkPromoDrill3')[0].checked = false;
    document.getElementsByName('atkPromoDrill4')[0].checked = false;
  } else if (civ_unit.promotions["Drill"] == 2) {
    document.getElementsByName('atkPromoDrill1')[0].checked = true;
    document.getElementsByName('atkPromoDrill2')[0].checked = true;
    document.getElementsByName('atkPromoDrill3')[0].checked = false;
    document.getElementsByName('atkPromoDrill4')[0].checked = false;
  } else if (civ_unit.promotions["Drill"] == 3) {
    document.getElementsByName('atkPromoDrill1')[0].checked = true;
    document.getElementsByName('atkPromoDrill2')[0].checked = true;
    document.getElementsByName('atkPromoDrill3')[0].checked = true;
    document.getElementsByName('atkPromoDrill4')[0].checked = false;
  } else if (civ_unit.promotions["Drill"] == 4) {
    document.getElementsByName('atkPromoDrill1')[0].checked = true;
    document.getElementsByName('atkPromoDrill2')[0].checked = true;
    document.getElementsByName('atkPromoDrill3')[0].checked = true;
    document.getElementsByName('atkPromoDrill4')[0].checked = true;
  }
}