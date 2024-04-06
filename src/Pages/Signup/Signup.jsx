import React, { useState } from 'react'
import "./Signup.css"
import { Input, InputGroup } from 'rsuite'
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
//import CheckIcon from '@rsuite/icons/legacy/Check';

const Signup = () => {

	const [step, setStep] = useState(0)
	const [verify, setVerify] = useState(false)
	const [visible, setVisible] = useState({
		pass: false,
		confirm: false
	})
		// const [profile,setProfile] = useState({
		// 	fname:"",
		// 	lname:"",
		// 	email:"",
		// 	pass:"",
		// 	confirm:"",
		// 	otp:"",
		// })

	// const handleSubmit = () => {

	// }

	return (
		<div className="row signupform">
			<fieldset className="col-xl-5 col-lg-6 col-md-7 col-sm-8 col-9 fieldset center">
				<h3 className="text">
					<span>Create Account</span>
				</h3>
				<br />

				<div className='signup-container row justify-content-start'>
					<table className='col-12 singup-table'>
						{
							step === 0 &&
							<>
								<tr>
									<td>
										<span className='label'>First Name : </span><br />
										<Input />
									</td>
									<td>
										<span className="label">Last Name : </span><br />
										<Input />
									</td>
								</tr>
								<tr>
									<td>
										<span className="label">Email ID : </span><br />
										<Input />
									</td>
									<td style={{ verticalAlign: "bottom" }}>
										{
											!verify ?
												<button type="button" onClick={() => setVerify(!verify)}>Verify Email ID</button>
												:
												<div className='d-flex'>
													<Input type="number" />
													<button type="button" ><i className='bx bx-check' /> </button>
													<button type="button" onClick={() => setVerify(!verify)}><i className='bx bx-x'></i></button>
												</div>
										}

									</td>
								</tr>
								<tr>
									<td>
										<span className="label">Password : </span><br />
										<InputGroup inside className='element'>
											<Input type={visible.pass ? 'text' : 'password'} />
											<InputGroup.Button onClick={() => setVisible((prev) => { return { ...prev, pass: !visible.pass } })}>
												{visible.pass ? <EyeIcon /> : <EyeSlashIcon />}
											</InputGroup.Button>
										</InputGroup>
									</td>
									<td></td>
								</tr>
								<tr>
									<td>
										<span className="label">Confirm Password : </span><br />
										<InputGroup inside className='element'>
											<Input type={visible.confirm ? 'text' : 'password'} />
											<InputGroup.Button onClick={() => setVisible((prev) => { return { ...prev, confirm: !visible.confirm } })}>
												{visible.confirm ? <EyeIcon /> : <EyeSlashIcon />}
											</InputGroup.Button>
										</InputGroup>
									</td>
									<td></td>
								</tr>
							</>
						}
						{
							step===1 &&
							<tr>
								<td colSpan={2}>Expense Details</td>
							</tr>
						}

						<tr>
							<td align='left'>
								<button onClick={() => setStep(step - 1)} disabled={step === 0}>Prev</button>
							</td>
							<td align='right'>
								<button onClick={() => setStep(step + 1)} disabled={step === 1}>Next</button>
							</td>
						</tr>
					</table>

				</div>
				<div>

				</div>
			</fieldset>
		</div>
	)
}

export default Signup