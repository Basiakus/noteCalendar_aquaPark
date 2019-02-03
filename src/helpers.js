export const getMonth = (month) => {
	const months = [
		' ',
		'Styczeń', 			
		'Luty', 
		'Marzec',
		'Kwiecień',
		'Maj',
	 	'Czerwiec',
	    'Lipiec',
		'Sierpień',
	    'Wrzesień',
		'Październik',
		'Listopad',
		'Grudzień'
	];
	return months[month];
}