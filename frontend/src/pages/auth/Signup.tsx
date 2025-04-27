// import GenericForm from '../../components/form/Form'
// import { ButtonType, FormField } from '../../components/types';
// import { useNavigate } from 'react-router-dom';
// import { registerRequest } from '../../services/authService';
// import { config } from '../../config/config';
// import { useAuth } from '../../contexts/AuthContext';

// const Signup = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const title: string = 'Sign up';
//   const fields: FormField[] = [
//     { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
//     { name: 'email', label: 'Email address', type: 'email', placeholder: 'Enter your email address', required: true },
//     { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter a password', required: true },
//     { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter your password', required: true }
//   ];
//   const buttons: ButtonType[] = [
//     { name: 'submit', label: 'Create account', type: 'submit' },
//     { name: 'login', label: 'Log in', type: 'button', onClick: () => {navigate(config.routes.loginRoute)} }
//   ]

//   const handleSignup = async (formData: Record<string, string>): Promise<void> => {
//     if (formData.password !== formData.confirmPassword) {
//       // TO DO: toast
//       console.log ("nu")
//     } else {
//       registerRequest(formData).then((userContext) => {
//         if(userContext) {
//           login(userContext);
//           navigate(config.routes.baseRoute);
//         }
//       })
//       .catch(() => {
//         // toast
//       })
//     }
//   }

//   return (
//     <div className=".full-screen login-page">
//       <div className="login-form-container">
//         bubu
//         <GenericForm
//           title={title}
//           fields={fields}
//           buttons={buttons}
//           onSubmit={handleSignup} 
//         />
//       </div>
//     </div>
//   );
// }

// export default Signup;