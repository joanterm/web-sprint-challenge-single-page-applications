import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"
import formSchema from "../formSchema"
import * as yup from "yup"

const Pizza = () => {
    const [formValues, setFormValues] = useState({
        name:"",
        size: "",
        topping1: false,
        topping2: false,
        topping3: false,
        topping4: false,
        special: ""
    })
    const [postOrder, setPostOrder] = useState([])
    //FOR SCHEMA:
    const [formErrors, setFormErrors] = useState({
        name:"",
        size: "",
        topping1: false,
        topping2: false,
        topping3: false,
        topping4: false,
        special: ""
    })
    const [disableButton, setDisableButton] = useState(true)

    useEffect(() => {
        formSchema.isValid(formValues)
        .then(valid => setDisableButton(!valid))
    }, [formValues])

    const handleChange = (e) => {
        console.log(e.target.value)
        const {type, name, value, checked} = e.target
        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value
        })
        yup.reach(formSchema, name)
        .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ""}))
        .catch(error => setFormErrors({...formErrors, [name]: error.errors[0]}))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const pizza = {
            name: formValues.name.trim(),
            size: formValues.size.trim(),
            toppings: ["topping1", "topping2", "topping3", "topping4"].filter(topping => !!formValues[topping]),
            special: formValues.special.trim()
        }
        postNewPizza(pizza)
    }

    const postNewPizza = (newPizza) => {
        axios.post("https://reqres.in/api/orders", newPizza)
        .then((response) => {
            console.log(response)
            setPostOrder([
                ...postOrder,
                response.data
            ])
        })
        .catch((error) => {
            return error
        })
    }

    return ( 
        <div>
            <h1 id="form-area">FORM AREA</h1>
            <Link to="/pizza">Pizza</Link>
            <form action="" id="pizza-form" onSubmit={handleSubmit}>
            <p>{formErrors.name}</p>
            <p>{formErrors.size}</p>
                <input id="name-input"
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
                <select id="size-dropdown"
                    name='size'
                    value={formValues.size}
                    onChange={handleChange}  
                >
                    <option value="">--Pizza Size--</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                <div>
                    <p>TOPPINGS</p>
                    <label>Bacon
                    <input 
                        type="checkbox"
                        name="topping1"
                        value="topping1"
                        checked={formValues.topping1}
                        onChange={handleChange}                                       
                    />
                    </label>
                    <label>Mushrooms
                    <input 
                        type="checkbox"
                        name="topping2"
                        value="topping2"
                        checked={formValues.topping2}
                        onChange={handleChange}                      
                    />
                    </label>
                    <label>Tomatoes
                    <input 
                        type="checkbox"
                        name="topping3"
                        value="topping3"
                        checked={formValues.topping3}
                        onChange={handleChange}                      
                    />
                    </label>
                    <label>Olives
                    <input 
                        type="checkbox"
                        name="topping4"
                        value="topping4"
                        checked={formValues.topping4}
                        onChange={handleChange}                    
                    />
                    </label>
                    <input id="special-text"
                        type="text"
                        placeholder="Special instructions?"
                        name="special"
                        value={formValues.special}
                        onChange={handleChange}
                    />
                    <input type="submit" id="order-button" value="Order!"disabled={disableButton}/>
                </div>
            </form>
        </div>
     );
}
 
export default Pizza;