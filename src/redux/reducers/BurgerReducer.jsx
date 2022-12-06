
 const burgerState = {
    burger: {
        salad: 1,
        cheese: 1,
        beef: 1
    },
    menu: {
        salad: 10,
        cheese: 20,
        beef: 55
    },
    total: 85,
}
export const BurgerReducer = (state = burgerState, action) => {
    switch (action.type) {
        case 'ADD_TOPPING': {
            let { topping, amount } = action;

            // Update amount
            if (amount === -1 && state.burger[topping] < 1) {
                return { ...state }
            }
            let newBurger = { ...state.burger };
            newBurger[topping] += amount;
            state.burger = newBurger

            // Update total
            state.total += amount * state.menu[topping]
        }
    }
    return { ...state }
}
