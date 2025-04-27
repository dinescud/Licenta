// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerRequest } from '../../services/authService';
// import { useAuth } from '../../contexts/AuthContext';
// import { UserContext } from '../../types';

// const Register: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const userContext = await registerRequest({
//         email,
//         password,
//         externalId: email // Using email as externalId for now
//       }) as UserContext;
      
//       login(userContext);
//       navigate('/');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Registration failed');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register; 