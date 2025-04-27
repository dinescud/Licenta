// import { useNavigate } from 'react-router-dom'
// import GenericForm from '../../components/form/Form'
// import { ButtonType, FormField } from '../../components/types';
// // import './Login.scss';
// import { loginRequest } from '../../services/authService';
// import { useAuth } from '../../contexts/AuthContext';
// import { config } from '../../config/config';

// const Login = () => {
//   const navigate = useNavigate();

//   const { login } = useAuth();

//   const title: string = 'Login';
//   const fields: FormField[] = [
//     { name: 'email', label: 'Email address', type: 'email', placeholder: 'Enter your email address', required: true},
//     { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter password', required: true }
//   ];
//   const buttons: ButtonType[] = [
//     { name: 'submit', label: 'Log in', type: 'submit' },
//     { name: 'signup', label: 'Create Account', type: 'button', onClick: () => {navigate(config.routes.registerRoute)} }
//   ]

//   const submitLoginForm = async (formData: Record<string, string>) => {
//     await loginRequest(formData).then((userContext) => {
//       if(userContext) {
//         login(userContext);
//         navigate(config.routes.baseRoute);
//       }
//     })
//     .catch(() => {
//       // toast
//     })
//   }

//   return (
//     <div className="login-page">
//       <div className="login-form-container">
//         <GenericForm
//           title={title}
//           fields={fields}
//           buttons={buttons}
//           onSubmit={submitLoginForm}
//         />
//       </div>
//     </div>
//   );
  
// }

// export default Login