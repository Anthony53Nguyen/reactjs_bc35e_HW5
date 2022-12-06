import React, { Component } from 'react'
import { connect } from 'react-redux'
import './BaiTapBurger.css'

class BaiTapBurger extends Component {

    renderBurger = () => {
        let { burger } = this.props;
        let burgerContent = []
        for (let topping in burger) {
            let layers = []
            for (let i = 0; i < burger[topping]; i++) {
                layers.push(<div key={i} className={topping}></div>)
            }
            burgerContent.push(layers)
        }
        return burgerContent
    }
    renderTable = () => {
        let { menu, burger } = this.props;
        return Object.entries(menu).map(([topping, value], index) => {
            return <tr key={index}>
                <td className='d-flex justify-content-between'>
                    <div>{topping}</div>
                    <div className='pr-4'>
                        <button onClick={() => { this.props.addTopping(topping, -1) }} className='btn btn-danger'>-</button>
                        <span className='px-1'>{burger[topping]}</span>
                        <button onClick={() => { this.props.addTopping(topping, +1) }} className='btn btn-success'>+</button>
                    </div>
                </td>
                <td>{value}</td>
                <td>{value * burger[topping]}</td>
            </tr>
        })
    }
    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-6 text-center">
                        <h5 className='text-danger py-4'>Your Burger</h5>
                        <div className='breadTop'></div>
                        {this.renderBurger()}
                        <div className='breadBottom'></div>
                    </div>
                    <div className="col-6">
                        <h5 className='text-success pt-4 pb-5 text-center'>Pick your toppings</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Topping</th>
                                    <th scope="col">Price per topping</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable()}
                                <tr>

                                    <td></td>
                                    <td>You Pay: </td>
                                    <td>{this.props.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        burger: state.BurgerReducer.burger,
        menu: state.BurgerReducer.menu,
        total: state.BurgerReducer.total
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTopping: (topping, amount) => {
            const action = {
                type: 'ADD_TOPPING',
                topping,
                amount
            }
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaiTapBurger)

