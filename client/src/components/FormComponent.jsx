import React, {useState} from 'react'
import { useAppContext } from '../contextLib'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormComponent(props) {
    const {setLoggedUser} = useAppContext();
    const {formAction, inputs, formTitle} = props
    const [formData, setFormData] = useState(inputs.reduce((previous, input)=>{
        previous[input.name] = input.value
        return previous
    }, {} ));
    const[errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(formAction, formData)
        .then(response => {
            setLoggedUser(response.data.user)
            localStorage.setItem("loggedUser", JSON.stringify(response.data.user))
            navigate(`/dashboard`)
        })
        .catch(err => {
            const errArr = []
            const errObj = err.response.data.errors 
            for(const errKey in errObj){
                errArr.push(errObj[errKey]['message'])
            }
            setErrors(errArr)
            
        })
    }
  return (
    <div>
        <form  className='form-group' onSubmit={handleSubmit}>
            <h3 className='lead'>{formTitle}</h3>
            { inputs.map((input, i) =>{
                return(
                    <div className=" row" key={i}>
                        <label className=' col-form-label text-center border-0 '>{input.label}</label>
                        <input className='form-control lead' type={input.type} name = {input.name} value={formData[input.name]} onChange={handleChange} />
                    </div>
                )
            })
            }



            <button type="submit" className='btn btn-success'>Submit</button>
        </form>
        {
                errors.map((err, i)=>{
                    return(
                        <p key={i} className="text-danger">{err}</p>
                    )
                })
            }

    </div>
  )
}

export default FormComponent