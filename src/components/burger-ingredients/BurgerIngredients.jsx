import React from 'react';
import {useRef, useState} from 'react';
import burgerStyles from './burgeringredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsType} from '../ingredients-type/IngredientsType'

export default function BurgerIngredients ({data}) {
        
    const [current, setCurrent] = useState('bun');

    const bunsArray =data.filter((item) => item.type === 'bun');
    const mainArray =data.filter((item) => item.type === 'main');
    const sauceArray =data.filter((item) => item.type === 'sauce');
const bunsRef = useRef(null);
const mainRef = useRef(null);
const sauceRef = useRef(null);


const sectionRef = useRef(null);

const scroll =(ref) => sectionRef.current.scroll({
   top: ref.current.offsetTop - sectionRef.current.offsetTop -40 
})

const onCategoryClick = (cat, catRef) => () => {
    setCurrent(cat);
    const element = document.getElementById(cat);
    if (element) element.scrollIntoView ({behaviour: 'auto'})
}


    return(
        <section className = 'mr-10'>
            <p className = 'text text_type_main-large'>Соберите бургер</p>
            <div className ={`${styles.optionselection} mt-5`}>
                <Tab  active ={current==='bun'} onClick = {onCategoryClick('bun', bunsRef)}>Булки</Tab>
                <Tab  active ={current==='sauce'} onClick = {onCategoryClick('sauce', sauceRef)}>Соусы</Tab>
                <Tab  active ={current==='main'} onClick = {onCategoryClick('main', mainRef)}>Начинки</Tab>
            </div>
            
            <section className ={styles.options} ref = {sectionRef}>
<>
<Ingredientstype id = 'bun' title = 'булки' ingredients ={bunsArray} ref = {bunsRef} />
<Ingredientstype id = 'sauce' title = 'соусы' ingredients ={sauceArray} ref = {sauceRef} />
<Ingredientstype id = 'main' title = 'Начинки' ingredients ={mainArray} ref = {mainRef} />
</>
        </section>
        </section>
    )
}

