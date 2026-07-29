function selfCall(delay, func){
 $.Schedule(delay, function(){
  func();
  selfCall(delay, func);
 });
}

function weaponInfo(){
 var hudXuid = GameStateAPI.GetHudPlayerXuid();
 var weaponId = GameStateAPI.GetPlayerActiveWeaponItemId( hudXuid );
 var weaponIcon = InventoryAPI.GetItemInventoryImage( weaponId );
 var weaponName = InventoryAPI.GetItemName( weaponId );
 return {
  xuid: hudXuid,
  weaponId: weaponId,
  weaponIcon: weaponIcon,
  weaponName: weaponName,
 }
}

function showWeaponIcon(){
 var _el = $.GetContextPanel().FindChildTraverse('SpectatorWeaponDisplay');
 var weapon = weaponInfo();
 
 _el.SetImage("file://{images_econ}/" + weapon.weaponIcon + ".png");
 
 $.GetContextPanel().FindChildTraverse('WeaponName').text = $.LocalizeSafe(weapon.weaponName);
}

selfCall(0.01, showWeaponIcon);