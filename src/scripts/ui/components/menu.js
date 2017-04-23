export default {
    id: 'menu',
    component: 'Window',
    draggable: false,
    position: { x: 100, y: 20 },
    width: 280,
    height: 248,

    layout: [1, 3],
    children: [
        {
            id: 'menu_label',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'WELCOME TO\nTHE SMALLEST\nOF WORLDS',
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
            id: 'menu_button',
            component: 'Button',
            position: 'center',
            text: 'Press for full immersion',
            width: 160,
            height: 36
        }
    ]
}
