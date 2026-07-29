function selfCall(delay, func){
 $.Schedule(delay, function(){
  func();
  selfCall(delay, func);
 });
}

function alert() {
  var hudhint = $.GetContextPanel().FindChildTraverse('HudHintText');
  var hint = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint')[0];
  var hint_bg = hint.FindChildrenWithClassTraverse('hud-hint_bg')[0];
  var hint_priority = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint__priority-label')[0];
  var hint_label = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint__label')[0];
  var hudHintIcon = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint__icon')[0];

  if (hint_bg && hint.BHasClass('hud-hint--visible')) {
    hint_bg.style.width = '544px'; // Change width to match Scaleform UI
    hint_bg.style.opacity = '1';
    hint_bg.style.transitionDuration = '0.07s'; // decrease duration for choppier animation
    hint_bg.style.transitionDelay = '0.11s , 0.11s'; // increase delay for choppier animation
    hint_bg.style.transitionProperty = 'width, opacity';
    hint_bg.style.transitionTimingFunction = 'cubic-bezier(0.42, 0, 0.58, 1)'; // Change timing function to match Scaleform UI
  } else if (hint_bg) {
    hint.style.opacity = '1';
    hint_bg.style.height = '104px'; // Change height to match Scaleform UI
    hint_bg.style.width = '0px';
    hint_bg.style.horizontalAlign = 'left';
    hint_bg.style.marginLeft = '56px'; // Change margin to match Scaleform UI
    hint_bg.style.backgroundColor = 'gradient( linear, 0% 0%, 100% 0%, from( #000000CC ), color-stop( 0.65, #000000CC ), to( #00000000 ) )';   // Change background color to match Scaleform UI
    hint_bg.style.transitionDuration = '0.07s'; // decrease duration for choppier animation
    hint_bg.style.transitionDelay = '0.11s , 0.11s'; // increase delay for choppier animation
    hint_bg.style.transitionProperty = 'width, opacity';
    hint_bg.style.transitionTimingFunction = 'cubic-bezier(0.42, 0, 0.58, 1)'; // Change timing function to match Scaleform UI
    hint_bg.style.position = '0px 52px 0px'; // Change position to match Scaleform UI
    hint_bg.style.opacity = '0';
  }
}

// outside function
var lastHintVisible = false;
var flashing = false;
function flashIcon(icon, icon_type) {

    // random chance
    if (Math.random() > 0.35 || flashing)
        return;

    flashing = true;

    // swap to flash image
    icon.SetImage('file://{images}/hud/ui/alertflash.png');

    // after brief flash return to normal image
    $.Schedule(0.08, function () {

        if (icon && icon.IsValid()) {
            icon.SetImage(icon_type);
        }

        flashing = false;
    });
}

function alertinfo() {

    var hudhint = $.GetContextPanel().FindChildTraverse('HudHintText');
    var hint = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint')[0];
    var hint_bg = hint.FindChildrenWithClassTraverse('hud-hint_bg')[0];
    var hint_priority = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint__priority-label')[0];
    var hint_label = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint__label')[0];
    var hudHintIcon = $.GetContextPanel().FindChildrenWithClassTraverse('hud-hint__icon')[0];

    var visible = hint.BHasClass('hud-hint--visible');

    // determine if this uses alert.png
    var isAlert =
        hint_label.text.indexOf('dropped') !== -1 ||
        hint_label.text.indexOf('picked') !== -1 ||
        hint_label.text.indexOf('killed') !== -1 ||
		hint_label.text.indexOf('defused') !== -1 ||
		hint_label.text.indexOf('injure') !== -1 ||
		hint_label.text.indexOf('выбросили') !== -1 ||
		hint_label.text.indexOf('подобрали') !== -1 ||
		hint_label.text.indexOf('ранить') !== -1 ||
		hint_label.text.indexOf('заложена') !== -1 ||
		hint_label.text.indexOf('обезвреживают') !== -1 ||
		hint_label.text.indexOf('убили') !== -1 ||
        hint_label.text.indexOf('planted') !== -1;

    var icon_type = '';
    if (visible && isAlert && !flashing) {
        icon_type = 'file://{images}/hud/ui/alert.png';
    }
    else if (visible && !isAlert && !flashing) {
        icon_type = 'file://{images}/hud/ui/alertinfo.png';
    }

    // flash once at start
    if (visible && !lastHintVisible) {
        flashIcon(hudHintIcon, icon_type);
    }

    lastHintVisible = visible;

    if (visible) {

        if (isAlert) {

            // don't overwrite while flash image is active
            if (!flashing)
                hudHintIcon.SetImage('file://{images}/hud/ui/alert.png');

            hint_priority.style.visibility = 'visible';
            hudhint.style.uiScale = '90%';
        }
        else {
            if (!flashing)
                hudHintIcon.SetImage('file://{images}/hud/ui/alertinfo.png');

            hint_priority.style.visibility = 'collapse';
            hudhint.style.uiScale = '80%';
        }
    }
}

selfCall(1/30, alertinfo);
selfCall(1/30, alert);
