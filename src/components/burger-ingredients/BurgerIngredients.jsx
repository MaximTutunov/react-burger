import React from 'react';
import styles from './burgeringredients.module.css';
import {Tab, CurrencyIcon, Counter,} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from '../../utils/data.js'

const getItems =(data, type) => {
    return(
        <ul className = {styles.list_ingredients}>
            {data.filter((item)=> item.type === type).map((item) =>(
                <li className ={styles.card} key = {item._id}>
<Counter count = {1} size= 'defaault'/>
<img src ={item.image}/>
<div className ={styles.price}>
    <p className ="text">{item.price}</p>
    <CurrencyIcon type = "primary"/>
</div>
<h4 className = {styles.name}>{item.name}</h4>
                </li>
            ))}
        </ul>
    )
};

const BurgerIngredients = () =>{
    const [current, setCurrent] = React.useState('bun');

    return(
        <section className = {styles.ingredients}>
            <h1 className = 'text'>Соберите бургер</h1>
            <div className ={styles.tab__bar}>
                <Tab value = 'bun' active ={current==='bun'} onClick = {setCurrent}>Булки</Tab>
                <Tab value = 'sauce' active ={current==='sauce'} onClick = {setCurrent}>Соусы</Tab>
                <Tab value = 'main' active ={current==='main'} onClick = {setCurrent}>Начинки</Tab>
            </div>
            <ul className ={styles.list_types}>
<li>
    <h3 className ='text'>Булки</h3>
    {getItems(data, 'bun')}
</li>
<li>
    <h3 className ='text'>Соусы</h3>
    {getItems(data, 'sauce')}
</li>
<li>
    <h3 className ='text'>Начинки</h3>
    {getItems(data, 'main')}
</li>
            </ul>
        </section>
    )
}

export default BurgerIngredients;