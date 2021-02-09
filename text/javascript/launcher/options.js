function Options(width, height, opts){/* globe constructor */
    var baseSampleMultiplier = .7;
    if(!opts){opts = {};}
    this.width = width;
    this.height = height;
    // this.smokeIndex = 0;
    this.points = [];
    this.introLines = new THREE.Object3D();
    this.pins = [];
    this.markers = [];
    this.satelliteAnimations = [];
    this.satelliteMeshes = [];
    this.satellites = {};
    this.quadtree = new Quadtree2(new Vec2(180, 360), 5);
    this.active = true;
    var defaults = {
        font: "Inconsolata",
        baseColor: "#ffcc00",
        markerColor: "#ffcc00",
        pinColor: "#00eeee",
        satelliteColor: "#ff0000",
        blankPercentage: 0,
        thinAntarctica: .01, // only show 1% of antartica... you can't really see it on the map anyhow
        mapUrl: "resources/equirectangle_projection.png",
        introLinesAltitude: 1.10,
        introLinesDuration: 2000,
        introLinesColor: "#8FD8D8",
        introLinesCount: 60,
        scale: 1.0,
        dayLength: 28000,
        pointsPerDegree: 1.1,
        pointSize: .6,
        pointsVariance: .2,
        maxPins: 500,
        maxMarkers: 4,
        data: [],
        tiles: [],
        viewAngle: 0 };
    for(var i in defaults){
        if(!this[i]){
            this[i] = defaults[i];
            if(opts[i]){this[i] = opts[i];}}}
    this.setScale(this.scale);
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( this.width, this.height);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.domElement = this.renderer.domElement;
    this.data.sort(function(a,b){return (b.lng - b.label.length * 2) - (a.lng - a.label.length * 2)});
    for(var i = 0; i< this.data.length; i++){this.data[i].when = this.introLinesDuration*((180+this.data[i].lng)/360.0) + 500;}}
Globe.prototype.init = function(cb){/* public globe functions */
    this.camera = new THREE.PerspectiveCamera( 50, this.width / this.height, 1, this.cameraDistance + 300 );// create the camera
    this.camera.position.z = this.cameraDistance;
    this.cameraAngle=(Math.PI);
    this.scene = new THREE.Scene();// create the scene
    this.scene.fog = new THREE.Fog( 0x000000, this.cameraDistance, this.cameraDistance+300 );
    createIntroLines.call(this);
    // create the smoke particles
    this.smokeProvider = new SmokeProvider(this.scene);
    createParticles.call(this);
    setTimeout(cb, 500);};
Globe.prototype.destroy = function(callback){
    var _this = this;
    this.active = false;
    setTimeout(function(){
        while(_this.scene.children.length > 0){ _this.scene.remove(_this.scene.children[0]);}
        if(typeof callback == "function"){ callback();}}, 1000);};
Globe.prototype.addPin = function(lat, lon, text){
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    var opts = { lineColor: this.pinColor, topColor: this.pinColor, font: this.font}
    var altitude = 1.2;
    if(typeof text != "string" || text.length === 0){altitude -= .05 + Math.random() * .05;}
    var pin = new Pin(lat, lon, text, altitude, this.scene, this.smokeProvider, opts);
    this.pins.push(pin);
    var pos = latLon2d(lat, lon);// lets add quadtree stuff
    pin.pos_ = new Vec2(parseInt(pos.x),parseInt(pos.y)); 
    if(text.length > 0){ pin.rad_ = pos.rad;} 
    else { pin.rad_ = 1; }
    this.quadtree.addObject(pin);
    if(text.length > 0){
        var collisions = this.quadtree.getCollisionsForObject(pin);
        var collisionCount = 0;
        var tooYoungCount = 0;
        var hidePins = [];
        for(var i in collisions){
            if(collisions[i].text.length > 0){
                collisionCount++;
                if(collisions[i].age() > 5000){ hidePins.push(collisions[i]);} 
                else { tooYoungCount++;}}}
        if(collisionCount > 0 && tooYoungCount == 0){
            for(var i = 0; i< hidePins.length; i++){
                hidePins[i].hideLabel();
                hidePins[i].hideSmoke();
                hidePins[i].hideTop();
                hidePins[i].changeAltitude(Math.random() * .05 + 1.1);}} 
        else if (collisionCount > 0){
            pin.hideLabel();
            pin.hideSmoke();
            pin.hideTop();
            pin.changeAltitude(Math.random() * .05 + 1.1);}}
    if(this.pins.length > this.maxPins){
        var oldPin = this.pins.shift();
        this.quadtree.removeObject(oldPin);
        oldPin.remove();}
    return pin;}
Globe.prototype.addMarker = function(lat, lon, text, connected){
    var marker;
    var opts = { markerColor: this.markerColor, lineColor: this.markerColor, font: this.font};
    if(typeof connected == "boolean" && connected){ marker = new Marker(lat, lon, text, 1.2, this.markers[this.markers.length-1], this.scene, opts);}
    else if(typeof connected == "object"){ marker = new Marker(lat, lon, text, 1.2, connected, this.scene, opts);} 
    else { marker = new Marker(lat, lon, text, 1.2, null, this.scene, opts); }
    this.markers.push(marker);
    if(this.markers.length > this.maxMarkers){ this.markers.shift().remove();}
    return marker;}
Globe.prototype.addSatellite = function(lat, lon, altitude, opts, texture, animator){
    if(!opts){opts = {};}/* texture and animator are optimizations so we don't have to regenerate certain redundant assets */
    if(opts.coreColor == undefined){ opts.coreColor = this.satelliteColor;}
    var satellite = new Satellite(lat, lon, altitude, this.scene, opts, texture, animator);
    if(!this.satellites[satellite.toString()]){this.satellites[satellite.toString()] = satellite;}
    satellite.onRemove(function(){delete this.satellites[satellite.toString()];}.bind(this));
    return satellite;};
Globe.prototype.addConstellation = function(sats, opts){
    var texture, /* TODO: make it so that when you remove the first in a constellation it removes all others */
        animator,
        satellite,
        constellation = [];
    for(var i = 0; i< sats.length; i++){
        if(i === 0){ satellite = this.addSatellite(sats[i].lat, sats[i].lon, sats[i].altitude, opts);} 
        else { satellite = this.addSatellite(sats[i].lat, sats[i].lon, sats[i].altitude, opts, constellation[0].canvas, constellation[0].texture); }
        constellation.push(satellite);}
    return constellation;};
Globe.prototype.setMaxPins = function(_maxPins){
    this.maxPins = _maxPins;
    while(this.pins.length > this.maxPins){
        var oldPin = this.pins.shift();
        this.quadtree.removeObject(oldPin);
        oldPin.remove();}};
Globe.prototype.setMaxMarkers = function(_maxMarkers){
    this.maxMarkers = _maxMarkers;
    while(this.markers.length > this.maxMarkers){this.markers.shift().remove();}};
Globe.prototype.setBaseColor = function(_color){ this.baseColor = _color; createParticles.call(this);};
Globe.prototype.setMarkerColor = function(_color){ this.markerColor = _color; this.scene._encom_markerTexture = null;};
Globe.prototype.setPinColor = function(_color){ this.pinColor = _color;};
Globe.prototype.setScale = function(_scale){
    this.scale = _scale;
    this.cameraDistance = 1700/_scale;
    if(this.scene && this.scene.fog){
       this.scene.fog.near = this.cameraDistance;
       this.scene.fog.far = this.cameraDistance + 300;
       createParticles.call(this);
       this.camera.far = this.cameraDistance + 300;
       this.camera.updateProjectionMatrix();}};
Globe.prototype.tick = function(){
    if(!this.camera){return;}
    if(!this.firstRunTime){this.firstRunTime = Date.now();}
    addInitialData.call(this);
    TWEEN.update();
    if(!this.lastRenderDate){ this.lastRenderDate = new Date();}
    if(!this.firstRenderDate){ this.firstRenderDate = new Date();}
    this.totalRunTime = new Date() - this.firstRenderDate;
    var renderTime = new Date() - this.lastRenderDate;
    this.lastRenderDate = new Date();
    var rotateCameraBy = (2 * Math.PI)/(this.dayLength/renderTime);
    this.cameraAngle += rotateCameraBy;
    if(!this.active){ this.cameraDistance += (1000 * renderTime/1000);}
    this.camera.position.x = this.cameraDistance * Math.cos(this.cameraAngle) * Math.cos(this.viewAngle);
    this.camera.position.y = Math.sin(this.viewAngle) * this.cameraDistance;
    this.camera.position.z = this.cameraDistance * Math.sin(this.cameraAngle) * Math.cos(this.viewAngle);
    for(var i in this.satellites){this.satellites[i].tick(this.camera.position, this.cameraAngle, renderTime);}
    for(var i = 0; i< this.satelliteMeshes.length; i++){
        var mesh = this.satelliteMeshes[i];
        mesh.lookAt(this.camera.position);
        mesh.rotateZ(mesh.tiltDirection * Math.PI/2);
        mesh.rotateZ(Math.sin(this.cameraAngle + (mesh.lon / 180) * Math.PI) * mesh.tiltMultiplier * mesh.tiltDirection * -1);}
    if(this.introLinesDuration > this.totalRunTime){
        if(this.totalRunTime/this.introLinesDuration < .1){ this.introLines.children[0].material.opacity = (this.totalRunTime/this.introLinesDuration) * (1 / .1) - .2;}
        if(this.totalRunTime/this.introLinesDuration > .8){ this.introLines.children[0].material.opacity = Math.max(1-this.totalRunTime/this.introLinesDuration,0) * (1 / .2);} 
        else { this.introLines.children[0].material.opacity = 1;}
        this.introLines.rotateY((2 * Math.PI)/(this.introLinesDuration/renderTime));} 
    else if(this.introLines){ this.scene.remove(this.introLines); delete[this.introLines];}
    this.pointUniforms.currentTime.value = this.totalRunTime; // do the shaders
    this.smokeProvider.tick(this.totalRunTime);
    this.camera.lookAt( this.scene.position );
    this.renderer.render( this.scene, this.camera );}
module.exports = Globe;

