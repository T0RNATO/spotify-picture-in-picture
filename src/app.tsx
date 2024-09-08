export default async function main() {
    while (!Spicetify?.Player || !Spicetify?.Playbar?.Button || !Spicetify?.Player?.data?.item) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    let win: Window | null;

    Spicetify.Player.addEventListener("songchange", () => {
        render(win);
    });
    Spicetify.Player.addEventListener("onplaypause", togglePlay);
    Spicetify.Player.addEventListener("onprogress", (ev) => {songProgress(ev!.data)});

    const pipButton = new Spicetify.Playbar.Button(
      'Picture-In-Picture', ICONS.pip, togglePiP, !document.pictureInPictureEnabled
    );

    async function togglePiP() {
        if (window.documentPictureInPicture.window) {
            window.documentPictureInPicture.window.close();
            doc = null;
            pipButton.active = false;
            return;
        }

        win = await window.documentPictureInPicture.requestWindow({
            width: 400,
            height: 100,
        });

        // Add pagehide listener to handle the case of the pip window being closed using the browser X button
        win.addEventListener("pagehide", (event) => {
            pipButton.active = false;
            doc = null;
        });

        pipButton.active = true;
    }
}

let doc: Document | null;
let isPlaying = Spicetify.Player.isPlaying();

const ICONS = {
    pip: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M80-520v-80h144L52-772l56-56 172 172v-144h80v280H80Zm80 360q-33 0-56.5-23.5T80-240v-200h80v200h320v80H160Zm640-280v-280H440v-80h360q33 0 56.5 23.5T880-720v280h-80ZM560-160v-200h320v200H560Z"/></svg>`,
    leave_pip: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#555555"><path d="M160-160q-33 0-56.5-23.5T80-240v-280h80v280h640v-480H440v-80h360q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm523-140 57-57-124-123h104v-80H480v240h80v-103l123 123ZM80-600v-200h280v200H80Zm400 120Z"/></svg>`,
    play: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>`,
    pause: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"/></svg>`,
    next: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Zm80-240Zm0 90 136-90-136-90v180Z"/></svg>`,
    prev: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Zm-80-240Zm0 90v-180l-136 90 136 90Z"/></svg>`,
    move: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#555555"><path d="M480-80 310-250l57-57 73 73v-166h80v165l72-73 58 58L480-80ZM250-310 80-480l169-169 57 57-72 72h166v80H235l73 72-58 58Zm460 0-57-57 73-73H560v-80h165l-73-72 58-58 170 170-170 170ZM440-560v-166l-73 73-57-57 170-170 170 170-57 57-73-73v166h-80Z"/></svg>`,

}

function render(win?: Window | null) {
    if (!doc || !win) return;

    const track = Spicetify.Player.data.item;
    const trackLength = track.duration.milliseconds;
    const artists = (track.artists || []).map(a => a.name).join(", ");

    const initialProgress = Spicetify.Player.getProgress();

    doc.body.innerHTML = `
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
    <img src="${getAlbumImg()}" alt="" class="album"/>
    <div class="main">
        <div class="close button">${ICONS.leave_pip}</div>
        <div class="title">${Spicetify.Player.data.item.name}</div>
        ${artists ? `<div class="artists">${artists}</div>` : ''}
        <div class="controls">
            <div class="prev button">${ICONS.prev}</div>
            <div class="play button">${isPlaying ? ICONS.pause : ICONS.play}</div>
            <div class="next button">${ICONS.next}</div>
        </div>
        <div class="progress">
            <div class="bar" style="width: ${initialProgress / trackLength * 100}%"></div>
        </div>
    </div>
    `;
    doc.querySelector(".prev")!.addEventListener("click", Spicetify.Player.back);
    doc.querySelector(".play")!.addEventListener("click", (ev) => {
        Spicetify.Player.togglePlay();
    });
    doc.querySelector(".next")!.addEventListener("click", Spicetify.Player.next);
    doc.querySelector(".close")!.addEventListener("click", () => {
        win.close();
    });
}

function togglePlay() {
    if (!doc) return;
    const playButton = doc.querySelector<HTMLDivElement>(".play")!;
    isPlaying = !isPlaying;
    playButton.innerHTML = isPlaying ? ICONS.pause : ICONS.play;
}

function songProgress(time: number) {
    if (!doc) return;
    const bar = doc.querySelector<HTMLDivElement>(".bar")!;
    bar.style.width = `${time / Spicetify.Player.data.item.duration.milliseconds * 100}%`
}

window.documentPictureInPicture.addEventListener("enter", event => {
    doc = event.window.document;
    render(event.window);
})

function getAlbumImg() {
    const track = Spicetify.Player.data.item;
    return track.images?.find((e) => e.label === 'standard')?.url
        ?.replaceAll('spotify:image:', 'https://i.scdn.co/image/');
}

type DocumentPictureInPicture = {
    window: Window;
    requestWindow: (arg: { width: number; height: number }) => Promise<Window>;
    addEventListener: (event: "enter", callback: (event: {window: Window}) => void) => void;
};

declare global {
    interface Window {
        documentPictureInPicture: DocumentPictureInPicture;
    }

    interface GlobalThis {
        documentPictureInPicture: DocumentPictureInPicture;
    }
}