
/* Array de objetos de medios de pago que llegará desde una hoja de la spreadsheet con una conección a tavez de su API*/
const mediosPago = [
    {
        name: 'Efectivo',
        type: 'Cash',
        icon: 'fa-solid fa-money-bill'
    },
    {
        name: 'Santander',
        type: 'Debito',
        icon: 'fa-regular fa-credit-card'
    },
    {
        name: 'BBVA',
        type: 'Debito',
        icon: 'fa-regular fa-credit-card'
    },
    {
        name: 'Visa BBVA',
        type: 'Credito',
        icon: 'fa-solid fa-credit-card'
    },
    {
        name: 'Visa Santander',
        type: 'Credito',
        icon: 'fa-solid fa-credit-card'
    }
];



//Array con categorías disponibles que llegaran desde la spreadsheet a traves de la API
const categories = [
    {
        name: 'Salidas',
        icon: 'fa-solid fa-martini-glass-citrus', 
        ppto: 20000,
        gastoAcum: 8234
    },
    {
        name: 'Supermercado',
        icon: 'fa-solid fa-cart-shopping', 
        ppto: 40000,
        gastoAcum: 12343
    },
    {
        name: 'Combustible',
        icon: 'fa-solid fa-gas-pump', 
        ppto: 10000,
        gastoAcum: 5634
    },
    {
        name: 'Farmacia',
        icon: 'fa-solid fa-house-medical', 
        ppto: 2000,
        gastoAcum: 400
    },
    {
        name: 'Regalos',
        icon: 'fa-solid fa-gift', 
        ppto: 8000,
        gastoAcum: 1500
    },
    {
        name: 'Delivery',
        icon: 'fa-solid fa-motorcycle', 
        ppto: 15000,
        gastoAcum: 14800
    }
];