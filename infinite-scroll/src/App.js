import 'bootstrap/scss/bootstrap.scss'
import './style.sass';
import PhotoComponent from './components/PhotoComponent';
import {useEffect,useState} from 'react'

function App() {
	const apiKey = `-X6Ll4uHvS_JWOr3liPOqN4UsyKAvBKDwV3NJOTqFDQ`
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false);
	
	const fetchImage=async()=>{
		setIsLoading(true)
		try {
			const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`
			const response = await fetch(apiUrl)
			const data = await response.json()
			setPhotos((oldData)=>{
				return [...oldData,...data]
			});
		}catch (error) {
			console.log(error);
		}
		setIsLoading(false)
		

	}

	useEffect(() => {
		fetchImage()
		// eslint-disable-next-line
	}, [page]);


	useEffect(() => {
		const event = window.addEventListener('scroll',()=>{
			if(window.innerHeight+window.scrollY > document.body.offsetHeight-500 && !isLoading){
				setPage((oldPage)=>{
					return  oldPage+1
				})
			}
		})
		return window.removeEventListener('scroll',event)
		// eslint-disable-next-line
	}, []);

	return (
		<main className='page-scroll'>
			<div className="container">
				<h1> Infinite Scroll Photo | Unspash API</h1>	
				<div className='row g-3'>
					{photos.map((data,index)=>{
						return <PhotoComponent key={index} {...data}/>
					})}		
				</div>
			</div>
		</main>
	);
}

export default App;
