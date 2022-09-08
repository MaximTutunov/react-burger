import React from "react";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";

export default function BurgerIngredient(props) {
    const [stateDescription, setStateDescription] = React.useState(false)
    const openModal = () => {
        setStateDescription(true)
    }
    const closeAllModals = () => {
        setStateDescription(false)
    }

    return (
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
                <div className={styles.counter}>
                    <Counter count={1} size="default" />
                </div>
            </div>
            {stateDescription && (
                <Modal
                    title="Детали ингредиента"
                    onClose={closeAllModals}
                >
                    <IngredientsDetails {...props} />
                </Modal>
            )}
        </>
    )
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;