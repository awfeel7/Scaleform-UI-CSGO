function alphachanger() {
    var alphaStr = GameInterfaceAPI.GetSettingString("cl_hud_background_alpha");
    var alpha = parseFloat(alphaStr) || 0;
    
    // Оружие
    var weaponBg = $.GetContextPanel().FindChildrenWithClassTraverse('weaponpanelbgcenter')[0];
    if (weaponBg) {
        weaponBg.style.opacity = (alpha * 1.006633802816901).toString();
    }
    
    // Радар
    var radarBg = $.GetContextPanel().FindChildrenWithClassTraverse('hud-topleft')[0];
    if (radarBg) {
        radarBg.style.opacity = (alpha * 1.006633802816901).toString();
    }
    
    // Деньги
    var moneyBg = $.GetContextPanel().FindChildrenWithClassTraverse('money-text-bg')[0];
    if (moneyBg) {
        moneyBg.style.opacity = alphaStr; // тут оригинальная строка
    }
    
    // Бордеры
    var weaponBorder = $.GetContextPanel().FindChildrenWithClassTraverse('weaponpanelbgcenterborder')[0];
    if (weaponBorder) {
        weaponBorder.style.opacity = alpha > 0.001 ? (alpha * 1.655633802816901).toString() : '0';
    }
    
    var radarBorder = $.GetContextPanel().FindChildrenWithClassTraverse('hud-topleft-border')[0];
    if (radarBorder) {
        radarBorder.style.opacity = alpha > 0.001 ? (alpha * 1.655633802816901).toString() : '0';
    }
    
    var healthBorder = $.GetContextPanel().FindChildrenWithClassTraverse('hud-HA-bg-center-border')[0];
    if (healthBorder) {
        healthBorder.style.opacity = alpha > 0.001 ? (alpha * 1.655633802816901).toString() : '0';
    }
}

function scaleHud() {
    var screenWidth = $.GetContextPanel().actualuiscale_x;
    var screenHeight = $.GetContextPanel().actualuiscale_y;
    var scale = Math.min(screenWidth / 1920, screenHeight / 1080);
    var minScale = 1.2;
    var scaledValue = Math.max(scale, minScale);

    var hudParentScaling = $('#Hud');
    if (hudParentScaling) {
        hudParentScaling.style.uiScale = (GameInterfaceAPI.GetSettingString("hud_scaling") * 100 * scaledValue) + '%';
        hudParentScaling.style.zIndex = 100;
    }
}

function updateAlpha() {
    scaleHud();
    alphachanger();
    $.Schedule(0, updateAlpha); // 0 = следующий тик, достаточно
}

$.Schedule(0, updateAlpha);