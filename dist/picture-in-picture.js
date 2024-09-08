(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var s,n,v;async function e(){for(;!Spicetify?.Player||!Spicetify?.Playbar?.Button||!Spicetify?.Player?.data?.item;)await new Promise(e=>setTimeout(e,100));let e,t=(Spicetify.Player.addEventListener("songchange",()=>{i(e)}),Spicetify.Player.addEventListener("onplaypause",a),Spicetify.Player.addEventListener("onprogress",e=>{e=e.data,s&&(s.querySelector(".bar").style.width=e/Spicetify.Player.data.item.duration.milliseconds*100+"%")}),new Spicetify.Playbar.Button("Picture-In-Picture",v.pip,async function(){window.documentPictureInPicture.window?(window.documentPictureInPicture.window.close(),s=null,t.active=!1):((e=await window.documentPictureInPicture.requestWindow({width:400,height:100})).addEventListener("pagehide",e=>{t.active=!1,s=null}),t.active=!0)},!document.pictureInPictureEnabled))}function i(e){var t,i,a,l;s&&e&&(t=(i=Spicetify.Player.data.item).duration.milliseconds,i=(i.artists||[]).map(e=>e.name).join(", "),a=Spicetify.Player.getProgress(),s.body.innerHTML=`
    <style>
        body {
            display: flex;
            flex-direction: row !important; /*spotify has annoying default styles*/
            color: white;
            font-family: sans-serif;
            margin: 0;
            /*overflow: hidden;*/
        }
        .album {
            height: 100%;
            aspect-ratio: 1/1;
        }
        .main {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            position: relative;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 10px;
        }
        .title {
            text-align: center;
            font-size: 22px;
            font-weight: 800;
        }
        .artists {
            text-align: center;
            font-size: 16px;
            color: #999;
        }
        .close, .move {
            position: absolute;
            right: 0;
            padding: 10px;
        }
        .move { bottom: 0; }
        .close { top: 0; }
        .button {
            cursor: pointer;
            &:hover > svg {
                fill: #999;
            }
        }
        .progress {
            height: 5px;
            position: absolute;
            bottom: 0;
            width: 100%;
            > .bar {
                background: #7bdb0f;
                height: 100%;
                width: 0;
            }
        }
    </style>
    <img src="${l=Spicetify.Player.data.item,l.images?.find(e=>"standard"===e.label)?.url?.replaceAll("spotify:image:","https://i.scdn.co/image/")}" alt="" class="album"/>
    <div class="main">
        <div class="close button">${v.leave_pip}</div>
        <div class="title">${Spicetify.Player.data.item.name}</div>
        ${i?`<div class="artists">${i}</div>`:""}
        <div class="controls">
            <div class="prev button">${v.prev}</div>
            <div class="play button">${n?v.pause:v.play}</div>
            <div class="next button">${v.next}</div>
        </div>
        <div class="progress">
            <div class="bar" style="width: ${a/t*100}%"></div>
        </div>
    </div>
    `,s.querySelector(".prev").addEventListener("click",Spicetify.Player.back),s.querySelector(".play").addEventListener("click",e=>{Spicetify.Player.togglePlay()}),s.querySelector(".next").addEventListener("click",Spicetify.Player.next),s.querySelector(".close").addEventListener("click",()=>{e.close()}))}function a(){var e;s&&(e=s.querySelector(".play"),n=!n,e.innerHTML=n?v.pause:v.play)}n=Spicetify.Player.isPlaying(),v={pip:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M80-520v-80h144L52-772l56-56 172 172v-144h80v280H80Zm80 360q-33 0-56.5-23.5T80-240v-200h80v200h320v80H160Zm640-280v-280H440v-80h360q33 0 56.5 23.5T880-720v280h-80ZM560-160v-200h320v200H560Z"/></svg>',leave_pip:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#555555"><path d="M160-160q-33 0-56.5-23.5T80-240v-280h80v280h640v-480H440v-80h360q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm523-140 57-57-124-123h104v-80H480v240h80v-103l123 123ZM80-600v-200h280v200H80Zm400 120Z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>',next:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z"/></svg>',prev:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z"/></svg>',move:'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#555555"><path d="M480-80 310-250l57-57 73 73v-166h80v165l72-73 58 58L480-80ZM250-310 80-480l169-169 57 57-72 72h166v80H235l73 72-58 58Zm460 0-57-57 73-73H560v-80h165l-73-72 58-58 170 170-170 170ZM440-560v-166l-73 73-57-57 170-170 170 170-57 57-73-73v166h-80Z"/></svg>'},window.documentPictureInPicture.addEventListener("enter",e=>{s=e.window.document,i(e.window)}),(async()=>{await e()})()})();