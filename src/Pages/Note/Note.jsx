import React, { useEffect, useState } from 'react'
import "./Note.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../Action/User';
import { useNavigate } from 'react-router-dom';
import moment from "moment"
import { DeleteMessage, PostMessage } from '../../Action/Message';
const Note = ({ loading, onLoading }) => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [textMessage, setTextMessage] = useState("")
	const User = useSelector((state) => state.currentUserReducer)
	var toolbarOptions = [[{ 'list': 'bullet' }, 'bold', 'italic', 'underline', { 'list': 'ordered' }, 'link']];
	const module = {
		toolbar: toolbarOptions,
	};
	useEffect(() => {
		if (User === null) {
			dispatch(getUserDetails(navigate))
		}
	}, [User, dispatch, navigate])

	console.log(User)
	console.log(textMessage)

	const handleSubmit = () => {
		let message = textMessage.replaceAll(" ", "&nbsp;");
		onLoading(true)
		dispatch(PostMessage({message}, navigate, onLoading))
		setTextMessage("");
	}

	const handleDelete = (id) => {
		onLoading(true)
		dispatch(DeleteMessage(id, navigate, onLoading))
	}

	return (
		<div className='tabContent'>
			<div className='tabContent1'>
				<div className='note-container row flex-column align-items-start'>
					<div className='note-container-1 col-xl-7 col-lg-8 col-md-9'>
						<p className='title'>Save your notes safe and secure :</p>
						<ReactQuill style={{ backgroundColor: "white" }} onChange={(e) => setTextMessage(e)} theme="snow" modules={module} value={textMessage} />
						<div className='action'>
							<button onClick={() => handleSubmit()}>Save</button>
						</div>
					</div>
					<div className='note-container-2'>
						<p className='title'>Your Saved Notes :</p>
						{User && User.message.map((item) => (
							<>
								<div class="arrow-left"></div>
								<div className='message'>
									<table>
										<tr>
											<td colSpan={2}>
												<div>
													<div style={{ lineHeight: "0.5em" }} className='message-description' dangerouslySetInnerHTML={{ __html: item.mess }} />
												</div>
											</td>
										</tr>
										<tr>
											<td align='left'>{moment(item.postedOn).format("MMMM DD,YYYY HH:mm:ss")}</td>
											<td align='right'><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
										</tr>
									</table>
								</div>
							</>
						))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Note
