function selfCall(delay, func){
 $.Schedule(delay, function(){
  func();
  selfCall(delay, func);
 });
}

function RemoveAvatarColors() {
	GameInterfaceAPI.ConsoleCommand('mirv_cvar_unhide_all');
	GameInterfaceAPI.ConsoleCommand('cl_show_enemy_avatar_colors 0');
}

function hudSimple() {
    var simple = GameInterfaceAPI.ConsoleCommand('cl_hud_healthammo_style');

    if (simple > 0) {
        var hudsimple = $.GetContextPanel().FindChildrenWithClassTraverse('hud-HA-bg-center')[0];
        var hudsimpleborder = $.GetContextPanel().FindChildrenWithClassTraverse('hud-HA-bg-center-border')[0];
        
        if (hudsimple && hudsimpleborder) {
            hudsimple.SetImage('file://{images}/hud/healtharmor/hudsimple.png');
            hudsimpleborder.SetImage('file://{images}/hud/healtharmor/hudsimpleborder.png');
        }
    } else {
        var hudsimple = $.GetContextPanel().FindChildrenWithClassTraverse('hud-HA-bg-center')[0];
        var hudsimpleborder = $.GetContextPanel().FindChildrenWithClassTraverse('hud-HA-bg-center-border')[0];
        
        if (hudsimple && hudsimpleborder) {
            hudsimple.SetImage('file://{images}/hud/healtharmor/healthbg.png');
            hudsimpleborder.SetImage('file://{images}/hud/healtharmor/healthbgborder.png');
        }
    }
}

function update() {
	hudSimple();
	RemoveAvatarColors();
}

$.RegisterForUnhandledEvent('CSGOShowPauseMenu', update);
$.RegisterForUnhandledEvent('UnloadLoadingScreenAndReinit', update);