var style = document.createElement('style');
style.innerHTML = '.cssClass { color: #F00; }';
document.getElementsByTagName('head')[0].appendChild(style);

document.getElementById('someElementId').className = 'cssClass';