let installPrompt=null;
function showInstallHelp(){
 const local=location.protocol==='file:';
 dialog(`<h2>Install GabBrielle Store</h2><p class="hint" style="margin-top:16px">${local?'This downloaded HTML file cannot be installed as an Android app. Open the hosted HTTPS version in Chrome on your phone to install it.':'In Chrome on Android, open the ⋮ menu and select “Add to Home screen” or “Install app”. Open the app once while online to prepare it for offline use.'}</p><p class="hint" style="margin-top:16px">This device keeps its own stock and sales. To move existing records, download a backup from Inventory on your computer and restore it on your phone.</p><div class="actions"><button id="cancel">Close</button></div>`)
}
const beforeInstallRender=render;
render=function(){beforeInstallRender();const nav=document.querySelector('.nav');if(!nav)return;const button=document.createElement('button');button.id='installapp';button.textContent=matchMedia('(display-mode: standalone)').matches?'App installed':'Install on Android';button.onclick=async()=>{if(!installPrompt)return showInstallHelp();await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;render()};nav.append(button)};
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;render()});
window.addEventListener('appinstalled',()=>{installPrompt=null;toast('GabBrielle Store installed.');render()});
if('serviceWorker' in navigator&&location.protocol!=='file:'&&isSecureContext){navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(()=>navigator.serviceWorker.ready).then(()=>{toast('App ready for offline use on this device.')}).catch(()=>{toast('Offline setup did not finish. Connect to the internet and reopen the app.')})}
render();
