//localStorage.getItem('userName') ?? 'Mystery player'

const player = document.getElementsByClassName("player-name");
const textNode = document.createTextNode(localStorage.getItem('userName') ?? 'Mystery player');
player.appendChild(textNode);