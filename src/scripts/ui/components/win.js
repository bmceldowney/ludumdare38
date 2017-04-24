export default {
    id: 'win',
    component: 'Window',
    draggable: false,
    position: { x: 100, y: 60 },
    width: 280,
    height: 240,

    layout: [1, 3],
    children: [
        {
            id: 'win_label',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'YOU ARE\nVERY\nSUCCESSFUL.',
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
            id: 'win_button',
            component: 'Button',
            position: 'center',
            text: 'Try again',
            width: 160,
            height: 36
        }
    ]
}
