export default {
    id: 'win',
    component: 'Window',
    draggable: false,
    position: { x: 100, y: 60 },
    width: 280,
    height: 240,

    children: [
        {
            id: 'win_label_1',
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
        {
            id: 'win_label_2',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'YOU ARE\nPRETTY\nSUCCESSFUL.',
            width: 200,
            padding: 10,
            height: 50,
            font: {
                size: "32px",
                family: "Blocktopia_32pt",
                color: "#f0f0f0"
            }
        },
        {
            id: 'win_label_3',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'YOU ARE\nBARELY\nSUCCESSFUL.',
            width: 200,
            padding: 10,
            height: 50,
            font: {
                size: "32px",
                family: "Blocktopia_32pt",
                color: "#f0f0f0"
            }
        },
        {
            id: 'win_button',
            component: 'Button',
            position: { x: 60, y: 190 },
            text: 'Start over',
            width: 160,
            height: 36
        }
    ]
}
