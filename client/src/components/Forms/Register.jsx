import { useState } from 'preact/hooks';
import Field from '../Field/Field';
import useAuth from '../../hooks/useAuth';
import Form from './Form';
import FormContainer from './FormContainer';

const fields = [
  {
    type: "text",
    placeholder: "User1234",
    name: "username",
    label: "Nombre de Usuario"
  },
  {
    type: "email",
    placeholder: "email@test.com",
    name: "email",
    label: "Email"
  },
  {
    type: "password",
    placeholder: "*********",
    name: "password",
    label: "Contraseña"
  },
  {
    type: "password",
    placeholder: "*********",
    name: "passwordConfirmation",
    label: "Repetir contraseña"
  },
]

const Register = () => {
  const { register, registerError } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  console.log({ registerError })

  const handleInputChange = (e) => {
    setFormData((oldState) => ({ ...oldState, [e.target.name]: e.target.value }))
  }

  const handleLogin = (e) => {
    e.preventDefault();
    register(formData);
  }

  return (
    <FormContainer title={"Registrarse"}>
      <Form>
        {fields.map(input => {
          return (
            <Field
              key={input.name}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={formData[input.name]}
              label={input.label}
              onChange={handleInputChange}
            />
          )
        })}
        <button onClick={handleLogin}>Registrarse</button>
        {registerError && <p >{registerError.response.data.message}</p>}
      </Form>
    </FormContainer>
  )
}

export default Register;