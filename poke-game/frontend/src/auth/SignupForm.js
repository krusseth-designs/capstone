import React, { useState } from 'react';
import { useHistory} from 'react-router-dom';
import Alert from '../common/Alert';

/** Signup form.
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /game route
 * 
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignUpForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    
    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );
    
    /** Handle form submit:
     * calls signup func prop and, if successful, redirect to /game.
     */
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
        history.push("/game");
        } else {
        setFormErrors(result.errors);
        }
    }
    
    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }
    return (
       <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2 className="mb-3">Sign Up</h2>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                name="username"
                                placeholder='Username'
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                placeholder="First Name"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoComplete="firstName"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                placeholder="Last Name"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                                autoComplete="lastName"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>
                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null
                        }
                        <button
                            type="submit"
                            className="btn btn-primary float-right"
                            onSubmit={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignUpForm;