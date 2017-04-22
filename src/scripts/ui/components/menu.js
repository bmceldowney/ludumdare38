export default {
    id: 'menu',
    component: 'Window',
    draggable: false,
    position: { x: 20, y: 20 },
    width: 280,
    height: 248,

    layout: [1, 3],
    children: [
        {
            id: 'label',
            component: 'Label',
            position: 'center',
            text: 'WELCOME TO THE SMALLEST WORLD',
            width: 200,
            height: 50
        },
        null,
        {
            id: 'spacelabel',
            component: 'Label',
            position: 'center',
            text: 'Press space for full immersion',
            width: 200,
            height: 50
        }
    ]
}
