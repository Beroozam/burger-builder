import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../component/Burger/Burger'

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:5,
            bacon:0,
            cheese:0,
            meat:0
        }
    }

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;