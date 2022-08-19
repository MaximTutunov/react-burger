import React from 'react';
import styles from './burger-ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from "../modal/modal";

export default function BurgerIngredient (props) {
    const[isIngredientDetailsOpened, setIngredientDetailsOpened] = React.useState(false);
const openModal =() => {
    setIngredientDetailsOpened(true)
}
const closeAllModals =() =>{
    setIngredientDetailsOpened(false)
}

return(
    <>
    <div className={styles.card} onClick={openModal}>
                <img src={props.image} alt={props.name} />
                <div className={`${styles.price} text text_type_digits-default`}>
                    <p className={`${styles.price} pt-1 pb-1 pr-2`}>
                        {props.price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{props.name}</p>
                <div className={styles.count}>
                    <Counter count={1} size="default" />
                </div>
            </div>
            {isIngredientDetailsOpened && (
                <Modal
                    title="Детали ингредиента"
                    onClose={closeAllModals}
                >
                    <IngredientDetails {...props} />
                </Modal>
            )}
    </>
)



}