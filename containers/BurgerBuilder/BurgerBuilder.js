import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component {
  /*  constructor(props){
        super(props);
        this.state = {...}
    } */
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable:false,
    purchasing:false
  };

  updatePurchaseState = (ingredients) =>{

    /* const sum = Object.values(ingredients)
      .reduce((sum, el) => {
        return sum + el;
      }, 0); */
      
    const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey];
                })
                .reduce((sum,el) =>{
                  return sum+el;
                },0);
      console.log("sum",sum);
      this.setState({purchaseable:sum>0});
  }

  addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
          ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () =>{
    this.setState({purchasing:true});
  }
 purchaseCancelHandler = () =>{
   alert('hf');
  this.setState({purchasing:false});
 }
  render() {
    const disabledinfo = {
      ...this.state.ingredients
    };
    console.log(disabledinfo);
    for(let key in disabledinfo){
      console.log(key);  
      console.log(disabledinfo[key]);  
      disabledinfo[key] =disabledinfo[key] <= 0; 
      console.log( disabledinfo[key]);
    }
    console.log(disabledinfo);
    return (
      <>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}> 
          <OrderSummary ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
           ingredientAdded={this.addIngredientHandler}
           ingredientRemoved={this.removeIngredientHandler}
           disabled={disabledinfo}
           purchaseable={this.state.purchaseable}
           ordered={this.purchaseHandler}
           price={this.state.totalPrice}/>
      </>
    );
  }
}

export default BurgerBuilder;
