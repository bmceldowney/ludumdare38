export default {
    id: 'gameOver',
    component: 'Window',
    draggable: false,
    position: { x: 100, y: 60 },
    width: 280,
    height: 240,

    layout: [1, 3],
    children: [
        {
            id: 'gameOver_label',
            component: 'Label',
            position: { x: 40, y: 60 },
            text: 'THE EARTH\nIS\nUNLIVABLE.\nBAD JOB.',
            width: 200,
            padding: 10,
            height: 50,
            font: {
                size: "32px",
                family: "Blocktopia_32pt",
                color: "#f0f0f0"
            }
        },
        null,
        {
            id: 'gameOver_button',
            component: 'Button',
            position: 'center',
            text: 'Try again',
            width: 160,
            height: 36
        }
    ]
}
