export default {
    id: 'menu',
    component: 'Window',
    draggable: false,
    position: { x: 100, y: 60 },
    width: 280,
    height: 240,

    children: [
        {
            id: 'menu_label',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'DEFEND YOUR\nSMALLEST\nOF WORLDS',
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
            id: 'menu_instructions_label_1',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'The world is too small.\n\nAliens have arrived. They are using your\nworld as a dumping ground for their\ntrash.\n\nThe only rational way to combat this\nis to use newly discovered ultra-powerful\nslingshot technology to fling the most\ncarbon dioxide producing materials on the\nplanet (cars, cows and coal plants) at the\nattackers.',
            width: 200,
            padding: 10,
            height: 100,
            font: {
                size: "12px",
                family: "Blocktopia_12pt",
                color: "#f0f0f0"
            }
        },

        {
            id: 'menu_instructions_label_2',
            component: 'Label',
            position: { x: 40, y: 40 },
            text: 'The mothership is too powerful for you\nto do any real damage, but she cares\nabout her minions.\n\nVanquish enough of them and she will\nbecome depressed and give up.',
            width: 200,
            padding: 10,
            height: 100,
            font: {
                size: "12px",
                family: "Blocktopia_12pt",
                color: "#f0f0f0"
            }
        },
        {
            id: 'menu_more_instructions',
            component: 'Button',
            position: { x: 60, y: 190 },
            text: 'Continue',
            width: 160,
            height: 36
        },

        {
            id: 'menu_instructions',
            component: 'Button',
            position: { x: 60, y: 150 },
            text: 'Press for instructions',
            width: 160,
            height: 36
        },

        {
            id: 'menu_button',
            component: 'Button',
            position: { x: 60, y: 190 },
            text: 'Play',
            width: 160,
            height: 36
        }
    ]
}
